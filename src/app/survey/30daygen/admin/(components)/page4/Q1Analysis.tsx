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
import type { SurveyFormData } from "../../../types";
import { getComprehensiveAnalysis } from "../../analysis";
import QuestionCard from "../ui/QuestionCard";
import { StatsGrid, type StatsGridItem } from "../ui/StatsGrid";
import { CommentsTable } from "../ui/CommentsTable";
import React from "react";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface P4Q1AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q1Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: P4Q1AnalysisProps) {
  const analysisData = getComprehensiveAnalysis(responses, filterOption);

  const q1Options = [
    "I'm already using it",
    "Will use soon",
    "Will use sometime in future",
    "No, I'm unlikely to use it",
  ];

  const getQ1DistributionForLevel = (responses: SurveyResponseData[]) => {
    return q1Options.reduce(
      (acc, option) => {
        const count = responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page4?.seeYourselfUsing === option;
        }).length;

        const percentage =
          responses.length > 0 ? (count / responses.length) * 100 : 0;
        acc[option] = { count, percentage };
        return acc;
      },
      {} as Record<string, { count: number; percentage: number }>,
    );
  };

  const allDistribution = getQ1DistributionForLevel(analysisData.all.responses);
  const min3Distribution = getQ1DistributionForLevel(
    analysisData.min3.responses,
  );
  const min5Distribution = getQ1DistributionForLevel(
    analysisData.min5.responses,
  );

  const getCardColor = (option: string) => {
    if (option.includes("already using")) return "border-green-200 bg-green-50";
    if (option.includes("Will use soon")) return "border-blue-200 bg-blue-50";
    if (option.includes("sometime in future"))
      return "border-yellow-200 bg-yellow-50";
    return "border-red-200 bg-red-50";
  };

  // Filter responses by age for "Why Not Using" comments
  const ageFilteredResponses =
    filterOption === "all"
      ? responses
      : responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page1?.age === filterOption;
        });

  // Filter for responses with "Why Not Using" comments
  const whyNotUsingResponses = ageFilteredResponses
    .filter((response) => {
      const responseData = response.responseData as SurveyFormData;
      const whyComment = responseData?.page4?.whyNotUsing;
      return whyComment && whyComment.trim().length > 0;
    })
    .map((response) => {
      const responseData = response.responseData as SurveyFormData;
      const searchQueries = responseData?.searchQueries || [];
      const comment = responseData?.page4?.whyNotUsing || "";

      return {
        searchQueryCount: searchQueries.length,
        comment: comment.trim(),
      };
    });

  // Sort by search query count descending
  const sortedWhyNotResponses = whyNotUsingResponses.sort(
    (a, b) => b.searchQueryCount - a.searchQueryCount,
  );

  // Create stats grid items
  const statsGridItems: StatsGridItem[] = q1Options.map((option) => ({
    title: option,
    backgroundColor: getCardColor(option),
    allUsers: {
      percentage: allDistribution[option]?.percentage || 0,
      count: allDistribution[option]?.count || 0,
    },
    min3Queries: {
      percentage: min3Distribution[option]?.percentage || 0,
      count: min3Distribution[option]?.count || 0,
    },
    min5Queries: {
      percentage: min5Distribution[option]?.percentage || 0,
      count: min5Distribution[option]?.count || 0,
    },
  }));

  return (
    <div className="space-y-6">
      <QuestionCard title="Are you interested in using this app? (Q1)">
        <StatsGrid items={statsGridItems} />
        <div className="mt-8">
          <h3 className="leading-none font-semibold">If not, why?</h3>
          <CommentsTable
            data={sortedWhyNotResponses}
            totalResponses={ageFilteredResponses.length}
            emptyMessage='No "why not using" comments provided in the current selection.'
          />
        </div>
      </QuestionCard>
    </div>
  );
}
