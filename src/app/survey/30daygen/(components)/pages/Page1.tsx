"use client";

import { Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { type Page1Props } from "../../types";
import { CustomRadioItem } from "../ui/custom-radio-item";

export const Page1 = ({ control, errors }: Page1Props) => {
  const ageOptions = [
    { value: "under-15", label: "Under 15" },
    { value: "15-25", label: "15-25" },
    { value: "25-40", label: "25-40" },
    { value: "40-55", label: "40-55" },
    { value: "55+", label: "55+" },
  ];

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Thank you for volunteering to take this survey!
          </h1>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-md leading-relaxed text-gray-700">
              30day.me is a self-improvement app designed to help you reach your
              personal goals through 30-day challenges. A 30-day challenge
              encourages small, consistent actions every day for 30 days,
              helping you form habits and make real progress. Using this app,
              you can create 30-day challenges and track your progress using our
              calendar, uploading progress photos, and taking notes along the
              way. Small steps, Big changes!
            </p>
            <p className="text-md mt-4 leading-relaxed text-gray-700">
              Please follow the directions in the survey and answer the 10
              survey questions. The survey will take you ~10 minutes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Age Field */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Age Range</Label>
                <Controller
                  control={control}
                  name="page1.age"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <RadioGroup
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        className="flex flex-col gap-2"
                      >
                        {ageOptions.map((option, index) => (
                          <CustomRadioItem
                            key={option.value}
                            value={option.value}
                            id={`age-${index + 1}`}
                            label={option.label}
                            isSelected={field.value === option.value}
                            variant="card"
                          />
                        ))}
                      </RadioGroup>
                      {fieldState.error && (
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
