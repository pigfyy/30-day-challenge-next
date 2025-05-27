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
  setCurrentPage,
  isNextButtonDisabled,
  onSubmit,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isNextButtonDisabled: () => boolean;
  onSubmit: () => void;
}) => {
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  };

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
            <Button
              onClick={handleNext}
              className="px-8 py-2"
              disabled={isNextButtonDisabled()}
            >
              Next
            </Button>
          )}

          {currentPage === 4 && (
            <Button
              onClick={onSubmit}
              className="px-8 py-2"
              disabled={isNextButtonDisabled()}
            >
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
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = form;

  // Use form persistence hook
  const { clearSavedData } = useFormPersistence(
    form,
    currentPage,
    setCurrentPage,
  );

  const formData = watch();
  console.log(formData);

  const isNextButtonDisabled = () => {
    if (currentPage === 1) {
      const page1Errors = errors.page1;
      const page1Data = formData.page1;

      if (page1Errors || !page1Data.email) {
        return true;
      }
    }

    if (currentPage === 2) {
      // Page 2 is just a demo, no validation needed
      return false;
    }

    if (currentPage === 3) {
      const page3Errors = errors.page3;
      const page3Data = formData.page3;

      if (
        page3Errors ||
        !page3Data.q1 ||
        !page3Data.q2 ||
        !page3Data.q3 ||
        !page3Data.q4 ||
        !page3Data.q5 ||
        !page3Data.q6
      ) {
        return true;
      }
    }

    if (currentPage === 4) {
      const page4Errors = errors.page4;
      const page4Data = formData.page4;

      if (
        page4Errors ||
        !page4Data.seeYourselfUsing ||
        !page4Data.dailyTracking?.length ||
        !page4Data.engagementFeatures?.length ||
        !page4Data.habitChange ||
        !page4Data.appStoreEngagement
      ) {
        return true;
      }
    }

    return false;
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
        setCurrentPage={setCurrentPage}
        isNextButtonDisabled={isNextButtonDisabled}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default function Survey30DayGenPage() {
  return <Survey />;
}
