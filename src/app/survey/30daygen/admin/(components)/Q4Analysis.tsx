"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { SurveyFormData } from "../../types";
import React from "react";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface Q4AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q4Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: Q4AnalysisProps) {
  // Filter responses by age
  const ageFilteredResponses =
    filterOption === "all"
      ? responses
      : responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page1?.age === filterOption;
        });

  // Filter for responses with non-empty Q4 comments
  const q4Responses = ageFilteredResponses
    .filter((response) => {
      const responseData = response.responseData as SurveyFormData;
      const comment = responseData?.page3?.q4;
      return comment && comment.trim().length > 0;
    })
    .map((response) => {
      const responseData = response.responseData as SurveyFormData;
      const searchQueries = responseData?.searchQueries || [];
      const comment = responseData?.page3?.q4 || "";

      return {
        searchQueryCount: searchQueries.length,
        comment: comment.trim(),
      };
    });

  // Sort by search query count descending
  const sortedResponses = q4Responses.sort(
    (a, b) => b.searchQueryCount - a.searchQueryCount,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search System Comments (Q4)</CardTitle>
        <CardDescription>
          Additional comments about the search system from users who provided
          feedback
          {filterOption !== "all" &&
            ` (filtered for ${ageRangeLabels[filterOption]} age group)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              {sortedResponses.length} comments out of{" "}
              {ageFilteredResponses.length} total responses
            </p>
          </div>

          {sortedResponses.length > 0 ? (
            <div className="overflow-hidden rounded-lg border">
              <div className="grid grid-cols-[min-content_1fr] items-center">
                {/* Header */}
                <div className="flex items-center justify-center border-b bg-gray-50 px-4 py-2 text-center text-sm font-semibold whitespace-nowrap">
                  Queries
                  <br />
                  Tried
                </div>
                <div className="flex h-full items-center border-b bg-gray-50 px-4 py-2 text-sm font-semibold">
                  Comment
                </div>

                {/* Content rows */}
                {sortedResponses.map((response, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center justify-center px-4 py-3 hover:bg-gray-50">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800">
                        {response.searchQueryCount}
                      </span>
                    </div>
                    <div className="flex items-center px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm leading-relaxed text-gray-900">
                        {response.comment}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                No comments provided in the current selection.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
