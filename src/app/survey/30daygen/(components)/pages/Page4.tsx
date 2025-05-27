"use client";

import { Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type Page4Props } from "../../types";
import { CustomRadioItem } from "../ui/custom-radio-item";
import { CustomCheckboxItem } from "../ui/custom-checkbox-item";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Page4 = ({ control, errors }: Page4Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const screenshots = [
    {
      src: "/survey/home.png",
      alt: "Home screen of 30 Day Me app",
      title: "Home Screen - Track Progress & View All Challenges",
      description:
        "Users can see how their daily completion stacks up against other users and easily view all their challenges in one place",
    },
    {
      src: "/survey/view-challenge.png",
      alt: "View challenge screen of 30 Day Me app",
      title: "View Challenge - Daily Progress Tracking",
      description:
        "Easily set each day as complete or not complete, add progress images, and manage daily tasks",
    },
    {
      src: "/survey/create-challenge.png",
      alt: "Create challenge screen of 30 Day Me app",
      title: "Create Challenge - Custom Challenges & AI Recommendations",
      description:
        "Make your own custom challenge or use the AI search system. Browse recommendations that you can instantly join or edit to fit your needs",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length,
    );
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Questions about the app
          </h1>

          {/* App Overview Section */}
          <Card className="mb-6">
            <CardContent className="px-0 py-6">
              <p className="mb-6 px-6 text-gray-700">
                The following questions are about the 30 Day Me app as a whole.
                Here are some screenshots to help you understand what the app
                looks like:
              </p>

              {/* Carousel */}
              <div className="relative mx-auto md:px-6">
                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-lg border bg-white shadow-lg">
                  <Image
                    src={screenshots[currentSlide].src}
                    alt={screenshots[currentSlide].alt}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-full"
                  />
                </div>

                {/* Navigation Controls */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  {/* Left Arrow */}
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="bg-white shadow-sm hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* Dots Indicator */}
                  <div className="flex gap-2">
                    {screenshots.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          index === currentSlide
                            ? "bg-blue-600"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="bg-white shadow-sm hover:bg-gray-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Image Title */}
                <div className="mx-auto mt-3 max-w-md space-y-1 px-6 text-center">
                  <p className="text-sm font-semibold text-gray-800">
                    {screenshots[currentSlide].title}
                  </p>
                  <p className="mx-auto max-w-md text-xs text-gray-600">
                    {screenshots[currentSlide].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Survey Questions */}
        <Card>
          <CardHeader>
            <CardTitle>General App Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                1. Are you interested in using this app?
              </Label>
              <Controller
                control={control}
                name="page4.seeYourselfUsing"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      className="flex flex-col gap-2"
                    >
                      {[
                        {
                          value: "I'm already using it",
                          label: "I'm already using it",
                        },
                        { value: "Will use soon", label: "Will use soon" },
                        {
                          value: "Will use sometime in future",
                          label: "Will use sometime in future",
                        },
                        {
                          value: "No, I'm unlikely to use it",
                          label: "No, I'm unlikely to use it",
                        },
                      ].map((option) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`using-${(option.value || "").toLowerCase().replace(/\s+/g, "-")}`}
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

              {/* Conditional field: If unlikely, why? */}
              <Controller
                control={control}
                name="page4.seeYourselfUsing"
                render={({ field: parentField }) => (
                  <div>
                    {parentField.value === "No, I'm unlikely to use it" && (
                      <div className="ml-6 space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Why?
                        </Label>
                        <Controller
                          control={control}
                          name="page4.whyNotUsing"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Please explain why you're unlikely to use this app..."
                                value={field.value || ""}
                                onChange={field.onChange}
                                rows={3}
                              />
                              {fieldState.error && (
                                <p className="text-sm text-red-500">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Question 2: Habit change */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                2. If you have already used 30 Day Me, do you think it is
                changing your habits?
              </Label>
              <Controller
                control={control}
                name="page4.habitChange"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      className="flex flex-col gap-2"
                    >
                      {[
                        {
                          value: "Yes. It has helped me achieve my goals",
                          label: "Yes. It has helped me achieve my goals",
                        },
                        {
                          value:
                            "I have been seeing progress, but have not achieved my goals",
                          label:
                            "I have been seeing progress, but have not achieved my goals",
                        },
                        {
                          value: "It is not obvious yet",
                          label: "It is not obvious yet",
                        },
                        {
                          value: "Not applicable, I have not used it",
                          label: "Not applicable, I have not used it",
                        },
                      ].map((option) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`habit-${(option.value || "").toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
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

            {/* Question 3: What features will best help you engage? */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                3. Which features would help make the app more engaging? (Select
                all that apply)
              </Label>
              <Controller
                control={control}
                name="page4.engagementFeatures"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      {[
                        "No more features needed",
                        "Notifications",
                        "Leaderboard",
                        "Streaks",
                        "Community",
                        "Personal coaches",
                        "Others (please specify)",
                      ].map((feature) => (
                        <CustomCheckboxItem
                          key={feature}
                          value={feature}
                          id={`engagement-${feature}`}
                          label={feature}
                          isChecked={field.value?.includes(feature) || false}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            if (checked) {
                              field.onChange([...currentValues, feature]);
                            } else {
                              field.onChange(
                                currentValues.filter((v) => v !== feature),
                              );
                            }
                          }}
                          variant="card"
                        />
                      ))}
                    </div>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Conditional field: Others specify */}
              <Controller
                control={control}
                name="page4.engagementFeatures"
                render={({ field: parentField }) => (
                  <div>
                    {parentField.value?.includes("Others (please specify)") && (
                      <div className="ml-6 space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Please specify:
                        </Label>
                        <Controller
                          control={control}
                          name="page4.othersSpecify"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <Input
                                placeholder="Please specify other features..."
                                value={field.value || ""}
                                onChange={field.onChange}
                              />
                              {fieldState.error && (
                                <p className="text-sm text-red-500">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Question 4: What would you track every day? */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                4. What would you track every day if you use 30 Day Me? (Select
                all that apply)
              </Label>
              <Controller
                control={control}
                name="page4.dailyTracking"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      {[
                        "Completion of daily challenges",
                        "Add detailed to-do list",
                        "Take notes",
                        "Upload pictures to track progress",
                        "Others (please specify)",
                      ].map((option) => (
                        <CustomCheckboxItem
                          key={option}
                          value={option}
                          id={`tracking-${option}`}
                          label={option}
                          isChecked={field.value?.includes(option) || false}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            if (checked) {
                              field.onChange([...currentValues, option]);
                            } else {
                              field.onChange(
                                currentValues.filter((v) => v !== option),
                              );
                            }
                          }}
                          variant="card"
                        />
                      ))}
                    </div>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Conditional field: Others specify for daily tracking */}
              <Controller
                control={control}
                name="page4.dailyTracking"
                render={({ field: parentField }) => (
                  <div>
                    {parentField.value?.includes("Others (please specify)") && (
                      <div className="ml-6 space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Please specify:
                        </Label>
                        <Controller
                          control={control}
                          name="page4.dailyTrackingOthersSpecify"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <Input
                                placeholder="Please specify other tracking options..."
                                value={field.value || ""}
                                onChange={field.onChange}
                              />
                              {fieldState.error && (
                                <p className="text-sm text-red-500">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Question 5: App store engagement */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                5. Currently the app can be installed as a shortcut on your
                phone. If we publish the app to app stores, will it change your
                engagement?
              </Label>
              <Controller
                control={control}
                name="page4.appStoreEngagement"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      className="flex flex-col gap-2"
                    >
                      {[
                        {
                          value:
                            "Yes, I will only use the app if it is published to app stores",
                          label:
                            "Yes, I will only use the app if it is published to app stores",
                        },
                        {
                          value:
                            "Yes, I would be more likely to use the app if it is published to app stores",
                          label:
                            "Yes, I would be more likely to use the app if it is published to app stores",
                        },
                        {
                          value:
                            "No, I am okay with installing the app as a shortcut and adding it to the app store will not change my engagement",
                          label:
                            "No, I am okay with installing the app as a shortcut and adding it to the app store will not change my engagement",
                        },
                      ].map((option) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`store-${(option.value || "").toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
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

            {/* Question 6: Additional Comments */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                6. Please share any additional comments about the app in general
                (optional)
              </Label>
              <Controller
                control={control}
                name="page4.additionalComments"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Please share any additional thoughts or feedback about the app..."
                      value={field.value || ""}
                      onChange={field.onChange}
                      rows={4}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
