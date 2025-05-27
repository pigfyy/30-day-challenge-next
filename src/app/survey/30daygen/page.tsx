"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Page1 } from "./(components)/pages/Page1";
import { Page2 } from "./(components)/pages/Page2";
import { Page3 } from "./(components)/pages/Page3";
import { Page4 } from "./(components)/pages/Page4";
import { SurveyFormSchema, type SurveyFormData } from "./types";
import {
  clearLocalStorage,
  useFormPersistence,
} from "./(components)/hooks/useFormPersistence";
import { trpc } from "@/lib/util/trpc";

const SurveyCompleted = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-xl md:p-12">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Thank You Message */}
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Thank You!
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            We appreciate you taking the time to complete our 30-Day Challenge
            survey. Your feedback is invaluable in helping us create better
            experiences for our community.
          </p>

          {/* Additional Info */}
          <div className="mb-6 rounded-lg bg-blue-50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-blue-900">
              What happens next?
            </h3>
            <p className="text-sm leading-relaxed text-blue-700">
              Your responses have been securely saved and will help us improve
              our 30-day challenge program. Keep an eye out for updates and new
              features based on community feedback like yours!
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button
              onClick={() => (window.location.href = "/")}
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Return to Home
            </Button>

            <p className="text-sm text-gray-500">
              Have questions? Feel free to reach out to our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navigation = ({
  currentPage,
  handleNext,
  handleBack,
  onSubmit,
}: {
  currentPage: number;
  handleNext: () => void;
  handleBack: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="px-8 py-2"
            disabled={currentPage === 1}
          >
            Back
          </Button>

          <div className="text-sm font-medium text-gray-600">
            Section {currentPage}/4
          </div>

          {currentPage < 4 && (
            <Button onClick={handleNext} className="px-8 py-2">
              Next
            </Button>
          )}

          {currentPage === 4 && (
            <Button onClick={onSubmit} className="px-8 py-2">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Survey = ({
  onSubmit: surveySubmit,
}: {
  onSubmit: (data: SurveyFormData) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [validationAttempted, setValidationAttempted] = useState<{
    [key: number]: boolean;
  }>({});

  const form = useForm<SurveyFormData>({
    resolver: zodResolver(SurveyFormSchema),
    defaultValues: {
      page1: {
        age: "",
      },
      page3: {
        q1: "",
        q2a: "",
        q2b: "",
        q2c: "",
        q2d: "",
        q2e: "",
        q3: "",
        q4: "",
      },
      page4: {
        seeYourselfUsing: "",
        whyNotUsing: "",
        dailyTracking: [],
        engagementFeatures: [],
        othersSpecify: "",
        habitChange: "",
        appStoreEngagement: "",
        additionalComments: "",
      },
    },
    mode: "onSubmit",
  });

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    trigger,
    clearErrors,
  } = form;

  const { clearSavedData } = useFormPersistence(
    form,
    currentPage,
    setCurrentPage,
  );

  useEffect(() => {
    if (!validationAttempted[currentPage]) return;

    const subscription = form.watch((data, { name }) => {
      if (!name) return;

      if (currentPage === 1 && name.startsWith("page1.")) {
        if (name === "page1.age" && data.page1?.age !== undefined) {
          form.clearErrors("page1.age");
        }
      } else if (currentPage === 3 && name.startsWith("page3.")) {
        const fieldValue =
          data.page3?.[name.split(".")[1] as keyof typeof data.page3];
        if (fieldValue && fieldValue !== "") {
          form.clearErrors(name as any);
        }
      } else if (currentPage === 4 && name.startsWith("page4.")) {
        const fieldKey = name.split(".")[1] as keyof NonNullable<
          typeof data.page4
        >;
        const fieldValue = data.page4?.[fieldKey];
        if (
          Array.isArray(fieldValue)
            ? fieldValue.length > 0
            : fieldValue && fieldValue !== ""
        ) {
          form.clearErrors(name as any);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, currentPage, validationAttempted]);

  const handleNext = async () => {
    let isValid = false;

    setValidationAttempted((prev) => ({ ...prev, [currentPage]: true }));

    if (currentPage === 1) {
      isValid = await trigger("page1");
    } else if (currentPage === 2) {
      isValid = true;
    } else if (currentPage === 3) {
      isValid = await trigger("page3");
    } else if (currentPage === 4) {
      isValid = await trigger("page4");
      if (isValid) {
        const currentData = watch("page4");
        if (
          !currentData.dailyTracking?.length ||
          !currentData.engagementFeatures?.length
        ) {
          isValid = false;
          await trigger("page4");
        }
      }
    }

    if (isValid) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderCurrentPage = () => {
    const shouldShowErrors = validationAttempted[currentPage] || false;
    const pageErrors = shouldShowErrors ? errors : {};

    switch (currentPage) {
      case 1:
        return <Page1 control={control} errors={pageErrors} />;
      case 2:
        return <Page2 />;
      case 3:
        return <Page3 control={control} errors={pageErrors} />;
      case 4:
        return <Page4 control={control} errors={pageErrors} />;
      default:
        return (
          <div className="bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4">
              <p>Page {currentPage} - Coming soon</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full">
      {renderCurrentPage()}
      <Navigation
        currentPage={currentPage}
        handleNext={handleNext}
        handleBack={handleBack}
        onSubmit={handleSubmit(surveySubmit)}
      />
    </div>
  );
};

export default function Survey30DayGenPage() {
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const { mutate: createSurveyResponse } =
    trpc.surveyResponse.create.useMutation({
      onSettled: () => {
        clearLocalStorage();
        setIsFormCompleted(true);
      },
    });

  const onSubmit = async (data: SurveyFormData) => {
    try {
      createSurveyResponse(data);
    } catch (error) {
      console.error("Failed to save survey:", error);
    }
  };

  return (
    <div className="relative w-full">
      {isFormCompleted ? <SurveyCompleted /> : <Survey onSubmit={onSubmit} />}
    </div>
  );
}
