"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { SurveyFormData } from "../../../types";
import QuestionCard from "../ui/QuestionCard";
import { CommentsTable } from "../ui/CommentsTable";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface P4Q6AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q6Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: P4Q6AnalysisProps) {
  // Filter responses by age for additional comments
  const ageFilteredResponses =
    filterOption === "all"
      ? responses
      : responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page1?.age === filterOption;
        });

  // Filter for responses with additional comments
  const additionalCommentsResponses = ageFilteredResponses
    .filter((response) => {
      const responseData = response.responseData as SurveyFormData;
      const additionalComments = responseData?.page4?.additionalComments;
      return additionalComments && additionalComments.trim().length > 0;
    })
    .map((response) => {
      const responseData = response.responseData as SurveyFormData;
      const searchQueries = responseData?.searchQueries || [];
      const comment = responseData?.page4?.additionalComments || "";

      return {
        searchQueryCount: searchQueries.length,
        comment: comment.trim(),
      };
    });

  // Sort by search query count descending
  const sortedCommentsResponses = additionalCommentsResponses.sort(
    (a, b) => b.searchQueryCount - a.searchQueryCount,
  );

  return (
    <QuestionCard title="Please share any additional comments about the app in general (Q6)">
      <CommentsTable
        data={sortedCommentsResponses}
        totalResponses={ageFilteredResponses.length}
        emptyMessage="No additional comments provided in the current selection."
      />
    </QuestionCard>
  );
}
