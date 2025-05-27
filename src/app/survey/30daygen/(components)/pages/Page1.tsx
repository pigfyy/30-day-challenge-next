"use client";

import { Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { type Page1Props } from "../../types";

export const Page1 = ({ control, errors }: Page1Props) => {
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
            <p className="text-lg leading-relaxed text-gray-700">
              The 30day.me app aims to help you develop habits to reach your
              personal goals. Using this app, you can create a 30-day challenge,
              track your progress, … Small steps, big changes!
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Please take a quick tour of the app and answer 10 survey
              questions. The survey will take you approximately 10–15 minutes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-4">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email Address (Optional)
                </Label>
                <Controller
                  control={control}
                  name="page1.email"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address (optional)"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="w-full"
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

              {/* Age Field */}
              <div className="space-y-4">
                <Label htmlFor="age" className="text-base font-semibold">
                  Age (Optional)
                </Label>
                <Controller
                  control={control}
                  name="page1.age"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter your age (optional)"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="w-full"
                        min="1"
                        max="120"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
