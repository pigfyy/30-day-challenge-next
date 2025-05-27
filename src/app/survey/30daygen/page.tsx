"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Page1 } from "./(components)/pages/Page1";
import { Page2 } from "./(components)/pages/Page2";
import { Page3 } from "./(components)/pages/Page3";
import { Page4 } from "./(components)/pages/Page4";
import { SurveyFormSchema, type SurveyFormData } from "./types";
import { useFormPersistence } from "./(components)/hooks/useFormPersistence";

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

          {/* Section indicator */}
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

const Survey = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Centralized form state management
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
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    trigger,
    clearErrors,
  } = form;

  // Use form persistence hook
  const { clearSavedData } = useFormPersistence(
    form,
    currentPage,
    setCurrentPage,
  );

  const formData = watch();
  console.log(formData);

  const handleNext = async () => {
    let isValid = false;

    if (currentPage === 1) {
      // Page 1 fields are optional, so always allow proceeding
      isValid = true;
    } else if (currentPage === 2) {
      // Page 2 is just a demo, no validation needed
      isValid = true;
    } else if (currentPage === 3) {
      clearErrors("page3");
      isValid = await trigger("page3");
    } else if (currentPage === 4) {
      // Clear any existing errors for page 4 and then validate
      clearErrors("page4");
      isValid = await trigger("page4");

      // Additional check for empty arrays as a fallback
      if (isValid) {
        const currentData = watch("page4");
        if (
          !currentData.dailyTracking?.length ||
          !currentData.engagementFeatures?.length
        ) {
          isValid = false;
          // Force trigger validation again to show errors
          await trigger("page4");
        }
      }
    }

    if (isValid) {
      setCurrentPage(currentPage + 1);
    }
    // If validation fails, user stays on current page and sees errors
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Survey submitted:", data);

    clearSavedData();

    alert("Survey submitted successfully! Thank you for your feedback.");
  });

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 control={control} errors={errors} />;
      case 2:
        return <Page2 />;
      case 3:
        return <Page3 control={control} errors={errors} />;
      case 4:
        return <Page4 control={control} errors={errors} />;
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
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default function Survey30DayGenPage() {
  return <Survey />;
}
