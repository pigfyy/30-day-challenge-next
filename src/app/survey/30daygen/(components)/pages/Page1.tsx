"use client";

import { Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { type Page1Props } from "../../types";
import { CustomRadioItem } from "../ui/custom-radio-item";
import { ScreenshotCarousel } from "../ui/ScreenshotCarousel";

export const Page1 = ({ control, errors }: Page1Props) => {
  const screenshots = [
    {
      src: "/survey/home.png",
      alt: "Home screen of 30 Day Me app",
      title: "Home Screen - Track Progress & View All Challenges",
      description:
        "Users can see their daily completion and easily view all their challenges in one place",
    },
    {
      src: "/survey/create-challenge.png",
      alt: "Create challenge screen of 30 Day Me app",
      title: "Create Challenge - Custom Challenges & AI Recommendations",
      description:
        "Make your own custom challenge or use the AI search system. Browse recommendations that you can instantly join or edit to fit your needs",
    },
    {
      src: "/survey/view-challenge.png",
      alt: "View challenge screen of 30 Day Me app",
      title: "View Challenge - Daily Progress Tracking",
      description:
        "Easily set each day as complete or not complete, add progress images, and manage daily tasks",
    },
    {
      src: "/survey/leaderboard.png",
      alt: "Leaderboard screen of 30 Day Me app",
      title: "Leaderboard - Compare Progress with Others",
      description:
        "See how your daily completion stacks up against other users and stay motivated through friendly competition",
    },
  ];

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
          <CardContent>
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

        {/* App Screenshots Section */}
        <Card className="mb-8">
          <CardContent className="px-0">
            <p className="mb-6 px-6 text-gray-700">
              Here are some screenshots to help you understand what the app
              looks like:
            </p>

            <ScreenshotCarousel screenshots={screenshots} />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Age Group */}
              <div className="flex flex-col gap-4">
                <Label className="text-lg font-semibold text-gray-900">
                  What is your age group? *
                </Label>
                <div className="flex flex-col gap-2">
                  <Controller
                    control={control}
                    name="page1.age"
                    render={({ field, fieldState }) => (
                      <div className="flex flex-col gap-2">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
