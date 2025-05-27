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
    <div className="w-full">
      <div className="mx-auto max-w-4xl px-4">
        <p>Survey completed</p>
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
        email: "",
      },
      page3: {
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q6: "",
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
        if (
          name === "page1.email" &&
          ((data.page1?.email &&
            data.page1.email.includes("@") &&
            data.page1.email.includes(".")) ||
            data.page1?.email == "")
        ) {
          form.clearErrors("page1.email");
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
    trpc.surveyResponse.create.useMutation();

  const onSubmit = async (data: SurveyFormData) => {
    try {
      await createSurveyResponse(data);

      setIsFormCompleted(true);
      clearLocalStorage();
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
