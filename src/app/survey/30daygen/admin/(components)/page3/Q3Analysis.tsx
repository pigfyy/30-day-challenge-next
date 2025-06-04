"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { SurveyFormData } from "../../../types";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import QuestionCard from "@/app/survey/30daygen/admin/(components)/ui/QuestionCard";
import { CommentsTable } from "../ui/CommentsTable";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface Q4AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q3Analysis({
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
    <QuestionCard title="Search System Comments (Q3)">
      <CommentsTable
        data={sortedResponses}
        totalResponses={ageFilteredResponses.length}
      />
    </QuestionCard>
  );
}
