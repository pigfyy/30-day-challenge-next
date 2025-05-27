"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";
import { type Page3Props } from "../../types";
import { CustomRadioItem } from "../ui/custom-radio-item";

export const Page3 = ({ control, errors }: Page3Props) => {
  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Questions about GenAI search system
          </h1>
        </div>

        {/* Instructions */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed text-gray-700">
              Based on your experience with the AI search system on the previous
              page, please answer all of the following questions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GenAI Search System Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Question 1: How many prompts */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                How many prompts did you ask the AI?
              </Label>
              <Controller
                control={control}
                name="page3.q1"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      className="flex flex-col gap-2"
                    >
                      {[
                        { value: "< 3", label: "< 3" },
                        { value: "3–4", label: "3–4" },
                        { value: "≥ 5", label: "≥ 5" },
                      ].map((option, index) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`q1-${index + 1}`}
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

            {/* Questions 2-5: Likert Scale Table */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Please rate the following questions on a scale of 1-5:
              </Label>

              <div className="overflow-x-auto">
                <div className="min-w-[800px] overflow-hidden rounded-lg border border-gray-300">
                  {/* Header */}
                  <div
                    className="grid min-h-[60px] border-b border-gray-300 bg-gray-50"
                    style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr" }}
                  >
                    <div className="flex items-center border-r border-gray-300 p-3 text-left text-sm font-semibold">
                      Question
                    </div>
                    <div className="flex items-center justify-center border-r border-gray-300 p-3 text-center text-sm font-semibold">
                      Strongly Disagree (1)
                    </div>
                    <div className="flex items-center justify-center border-r border-gray-300 p-3 text-center text-sm font-semibold">
                      Disagree (2)
                    </div>
                    <div className="flex items-center justify-center border-r border-gray-300 p-3 text-center text-sm font-semibold">
                      Neutral (3)
                    </div>
                    <div className="flex items-center justify-center border-r border-gray-300 p-3 text-center text-sm font-semibold">
                      Agree (4)
                    </div>
                    <div className="flex items-center justify-center p-3 text-center text-sm font-semibold">
                      Strongly Agree (5)
                    </div>
                  </div>

                  {/* Question 2 */}
                  <Controller
                    control={control}
                    name="page3.q2"
                    render={({ field, fieldState }) => (
                      <>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <div
                            className="grid min-h-[60px] border-b border-gray-300"
                            style={{
                              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                            }}
                          >
                            <div className="flex items-center border-r border-gray-300 p-3 text-sm">
                              I&apos;m satisfied with the challenge search
                              system.
                            </div>
                            {[1, 2, 3, 4, 5].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q2-${value}`}
                                  label=""
                                  isSelected={field.value === value.toString()}
                                  variant="card"
                                />
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {fieldState.error && (
                          <div className="col-span-6 bg-red-50 p-2">
                            <p className="text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  />

                  {/* Question 3 */}
                  <Controller
                    control={control}
                    name="page3.q3"
                    render={({ field, fieldState }) => (
                      <>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <div
                            className="grid min-h-[60px] border-b border-gray-300"
                            style={{
                              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                            }}
                          >
                            <div className="flex items-center border-r border-gray-300 p-3 text-sm">
                              The recommended challenges are clear and
                              understandable.
                            </div>
                            {[1, 2, 3, 4, 5].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q3-${value}`}
                                  label=""
                                  isSelected={field.value === value.toString()}
                                  variant="card"
                                />
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {fieldState.error && (
                          <div className="col-span-6 bg-red-50 p-2">
                            <p className="text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  />

                  {/* Question 4 */}
                  <Controller
                    control={control}
                    name="page3.q4"
                    render={({ field, fieldState }) => (
                      <>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <div
                            className="grid min-h-[60px] border-b border-gray-300"
                            style={{
                              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                            }}
                          >
                            <div className="flex items-center border-r border-gray-300 p-3 text-sm">
                              The recommended challenges are aligned with my
                              searched goal.
                            </div>
                            {[1, 2, 3, 4, 5].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q4-${value}`}
                                  label=""
                                  isSelected={field.value === value.toString()}
                                  variant="card"
                                />
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {fieldState.error && (
                          <div className="col-span-6 bg-red-50 p-2">
                            <p className="text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  />

                  {/* Question 5 */}
                  <Controller
                    control={control}
                    name="page3.q5"
                    render={({ field, fieldState }) => (
                      <>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <div
                            className="grid min-h-[60px]"
                            style={{
                              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                            }}
                          >
                            <div className="flex items-center border-r border-gray-300 p-3 text-sm">
                              The search latency is acceptable.
                            </div>
                            {[1, 2, 3, 4, 5].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q5-${value}`}
                                  label=""
                                  isSelected={field.value === value.toString()}
                                  variant="card"
                                />
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {fieldState.error && (
                          <div className="col-span-6 bg-red-50 p-2">
                            <p className="text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Question 6: Challenge preference */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                How likely are you to start making challenges from the search
                results?
              </Label>
              <Controller
                control={control}
                name="page3.q6"
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
                            "I will directly join the recommended challenges",
                          label:
                            "I will directly join the recommended challenges",
                        },
                        {
                          value:
                            "I will start with the recommended challenges but tailor them for my own needs",
                          label:
                            "I will start with the recommended challenges but tailor them for my own needs",
                        },
                        {
                          value: "I prefer to make my own challenges",
                          label: "I prefer to make my own challenges",
                        },
                      ].map((option, index) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`q6-${index + 1}`}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
