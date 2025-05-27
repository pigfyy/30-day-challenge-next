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
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-3 text-left">
                        Question
                      </th>
                      <th className="border border-gray-300 p-3 text-center">
                        Very Satisfied/Strongly Agree (1)
                      </th>
                      <th className="border border-gray-300 p-3 text-center">
                        Somewhat Satisfied/Agree (2)
                      </th>
                      <th className="border border-gray-300 p-3 text-center">
                        Neutral (3)
                      </th>
                      <th className="border border-gray-300 p-3 text-center">
                        Somewhat Dissatisfied/Disagree (4)
                      </th>
                      <th className="border border-gray-300 p-3 text-center">
                        Very Dissatisfied/Strongly Disagree (5)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Question 2 */}
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        How satisfied are you in the challenge search?
                      </td>
                      <td colSpan={5} className="border border-gray-300 p-3">
                        <Controller
                          control={control}
                          name="page3.q2"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                className="flex justify-between"
                              >
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <CustomRadioItem
                                    key={value}
                                    value={value.toString()}
                                    id={`q2-${value}`}
                                    label={value.toString()}
                                    isSelected={
                                      field.value === value.toString()
                                    }
                                    variant="simple"
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
                      </td>
                    </tr>

                    {/* Question 3 */}
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        Are the recommended challenges clear and understandable?
                      </td>
                      <td colSpan={5} className="border border-gray-300 p-3">
                        <Controller
                          control={control}
                          name="page3.q3"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                className="flex justify-between"
                              >
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <CustomRadioItem
                                    key={value}
                                    value={value.toString()}
                                    id={`q3-${value}`}
                                    label={value.toString()}
                                    isSelected={
                                      field.value === value.toString()
                                    }
                                    variant="simple"
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
                      </td>
                    </tr>

                    {/* Question 4 */}
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        Are the recommended challenges aligned with your goals?
                      </td>
                      <td colSpan={5} className="border border-gray-300 p-3">
                        <Controller
                          control={control}
                          name="page3.q4"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                className="flex justify-between"
                              >
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <CustomRadioItem
                                    key={value}
                                    value={value.toString()}
                                    id={`q4-${value}`}
                                    label={value.toString()}
                                    isSelected={
                                      field.value === value.toString()
                                    }
                                    variant="simple"
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
                      </td>
                    </tr>

                    {/* Question 5 */}
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        How helpful are the recommended challenges in achieving
                        the searched goal?
                      </td>
                      <td colSpan={5} className="border border-gray-300 p-3">
                        <Controller
                          control={control}
                          name="page3.q5"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                className="flex justify-between"
                              >
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <CustomRadioItem
                                    key={value}
                                    value={value.toString()}
                                    id={`q5-${value}`}
                                    label={value.toString()}
                                    isSelected={
                                      field.value === value.toString()
                                    }
                                    variant="simple"
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
                      </td>
                    </tr>
                  </tbody>
                </table>
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
