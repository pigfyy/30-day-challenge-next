"use client";

import { Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Page4Props } from "../../types";
import { CustomRadioItem } from "../ui/custom-radio-item";
import { CustomCheckboxItem } from "../ui/custom-checkbox-item";

export const Page4 = ({ control, errors }: Page4Props) => {
  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Questions about the app
          </h1>
        </div>

        {/* Survey Questions */}
        <Card>
          <CardHeader>
            <CardTitle>General App Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Question 1: Do you see yourself using this app? */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                1. Do you see yourself using this app?
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
                        { value: "Yes", label: "Yes" },
                        { value: "No", label: "No" },
                      ].map((option) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`using-${option.value.toLowerCase()}`}
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

              {/* Conditional field: If no, why? */}
              <Controller
                control={control}
                name="page4.seeYourselfUsing"
                render={({ field: parentField }) => (
                  <div>
                    {parentField.value === "No" && (
                      <div className="ml-6 space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          If no, why?
                        </Label>
                        <Controller
                          control={control}
                          name="page4.whyNotUsing"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Please explain why you wouldn't use this app..."
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

            {/* Question 2: What would you track every day? */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                2. What would you track every day if you use 30 Day Me? (Select
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

            {/* Question 3: What features will best help you engage? */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                3. What features will best help you engage? (Select all that
                apply)
              </Label>
              <Controller
                control={control}
                name="page4.engagementFeatures"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      {[
                        "No more feature needed",
                        "Notifications",
                        "Leaderboard",
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

            {/* Question 4: Habit change */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                4. If you have already used 30 Day Me, do you think it is
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
                          value: "Yes. It has been helping me achieve my goals",
                          label: "Yes. It has been helping me achieve my goals",
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
                          id={`habit-${option.value.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
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
                            "I would only use it if it was published to the app store",
                          label:
                            "I would only use it if it was published to the app store",
                        },
                        {
                          value:
                            "I'm more likely to use the app if published to the app store",
                          label:
                            "I'm more likely to use the app if published to the app store",
                        },
                        {
                          value:
                            "I can install it as a shortcut now and it will not change my engagement",
                          label:
                            "I can install it as a shortcut now and it will not change my engagement",
                        },
                      ].map((option) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`store-${option.value.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
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
                6. Please share any additional comments (optional)
              </Label>
              <Controller
                control={control}
                name="page4.additionalComments"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Please share any additional thoughts or feedback..."
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
