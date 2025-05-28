"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import { type Page3Props } from "../../types";
import { CustomRadioItem } from "../ui/custom-radio-item";

export const Page3 = ({ control, errors, isTurk }: Page3Props) => {
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
                1. How many questions did you try with the search system?
              </Label>

              {/* Turk Warning */}
              {isTurk && (
                <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <div className="flex items-start">
                    <svg
                      className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="text-sm font-semibold text-red-800">
                        Important Notice
                      </h4>
                      <p className="mt-1 text-sm text-red-700">
                        <strong>
                          You must ask at least 5 different questions to the
                          search system for your survey response to be valid.
                        </strong>{" "}
                        If you asked fewer than 5 questions, please go back to
                        the previous page and try more searches before
                        continuing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

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

            {/* Questions 2: Likert Scale Table */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                2. Please rate the following questions on a scale of 1-5:
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
                      Strongly Agree (5)
                    </div>
                    <div className="flex items-center justify-center border-r border-gray-300 p-3 text-center text-sm font-semibold">
                      Agree (4)
                    </div>
                    <div className="flex items-center justify-center border-r border-gray-300 p-3 text-center text-sm font-semibold">
                      Neutral (3)
                    </div>
                    <div className="flex items-center justify-center border-r border-gray-300 p-3 text-center text-sm font-semibold">
                      Disagree (2)
                    </div>
                    <div className="flex items-center justify-center p-3 text-center text-sm font-semibold">
                      Strongly Disagree (1)
                    </div>
                  </div>

                  {/* Question 2a */}
                  <Controller
                    control={control}
                    name="page3.q2a"
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
                            {[5, 4, 3, 2, 1].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q2a-${value}`}
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

                  {/* Question 2b */}
                  <Controller
                    control={control}
                    name="page3.q2b"
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
                            {[5, 4, 3, 2, 1].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q2b-${value}`}
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

                  {/* Question 2c */}
                  <Controller
                    control={control}
                    name="page3.q2c"
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
                              The recommended challenges are relevant to the
                              searched goal.
                            </div>
                            {[5, 4, 3, 2, 1].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q2c-${value}`}
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

                  {/* Question 2d */}
                  <Controller
                    control={control}
                    name="page3.q2d"
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
                              Following challenges recommended by the system
                              would help achieve the searched goal.
                            </div>
                            {[5, 4, 3, 2, 1].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q2d-${value}`}
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

                  {/* Question 2e */}
                  <Controller
                    control={control}
                    name="page3.q2e"
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
                            {[5, 4, 3, 2, 1].map((value, index) => (
                              <div
                                key={value}
                                className={`flex items-center justify-center ${
                                  index < 4 ? "border-r border-gray-300" : ""
                                }`}
                              >
                                <CustomRadioItem
                                  value={value.toString()}
                                  id={`q2e-${value}`}
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

            {/* Question 3: Challenge preference */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                3. Would you use the AI challenge search feature?
              </Label>
              <Controller
                control={control}
                name="page3.q3"
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
                            "Yes, I will directly join the recommended challenges",
                          label:
                            "Yes, I will directly join the recommended challenges",
                        },
                        {
                          value:
                            "Yes, but I will edit and tailor them to my own needs",
                          label:
                            "Yes, but I will edit and tailor them to my own needs",
                        },
                        {
                          value: "No, I prefer to make my own challenges",
                          label: "No, I prefer to make my own challenges",
                        },
                      ].map((option, index) => (
                        <CustomRadioItem
                          key={option.value}
                          value={option.value}
                          id={`q3-${index + 1}`}
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

            {/* Question 4: Search system comments */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                4. Please provide any additional comments about the search
                system (optional):
              </Label>
              <Controller
                control={control}
                name="page3.q4"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Please share any additional thoughts about the search system..."
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
