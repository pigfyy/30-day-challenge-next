"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { SurveyFormData } from "../../../types";
import { getComprehensiveAnalysis } from "../../analysis";
import QuestionCard from "../ui/QuestionCard";
import { StatsGrid, type StatsGridItem } from "../ui/StatsGrid";
import { CommentsTable } from "../ui/CommentsTable";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface P4Q4AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q4Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: P4Q4AnalysisProps) {
  const analysisData = getComprehensiveAnalysis(responses, filterOption);

  const q4Options = [
    "Completion of daily challenges",
    "Add detailed to-do list",
    "Take notes",
    "Upload pictures to track progress",
    "Others (please specify)",
  ];

  const getQ4DistributionForLevel = (responses: SurveyResponseData[]) => {
    return q4Options.reduce(
      (acc, option) => {
        const count = responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          const dailyTracking = responseData?.page4?.dailyTracking || [];
          return dailyTracking.includes(option);
        }).length;

        const percentage =
          responses.length > 0 ? (count / responses.length) * 100 : 0;
        acc[option] = { count, percentage };
        return acc;
      },
      {} as Record<string, { count: number; percentage: number }>,
    );
  };

  const allDistribution = getQ4DistributionForLevel(analysisData.all.responses);
  const min3Distribution = getQ4DistributionForLevel(
    analysisData.min3.responses,
  );
  const min5Distribution = getQ4DistributionForLevel(
    analysisData.min5.responses,
  );

  const getCardColor = (option: string) => {
    if (option.includes("Completion of daily challenges"))
      return "border-blue-200 bg-blue-50";
    if (option.includes("Add detailed to-do list"))
      return "border-green-200 bg-green-50";
    if (option.includes("Take notes")) return "border-purple-200 bg-purple-50";
    if (option.includes("Upload pictures"))
      return "border-orange-200 bg-orange-50";
    return "border-yellow-200 bg-yellow-50"; // Others
  };

  // Filter responses by age for "Others" comments
  const ageFilteredResponses =
    filterOption === "all"
      ? responses
      : responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page1?.age === filterOption;
        });

  // Filter for responses with "Others" comments
  const othersResponses = ageFilteredResponses
    .filter((response) => {
      const responseData = response.responseData as SurveyFormData;
      const dailyTracking = responseData?.page4?.dailyTracking || [];
      const othersComment = responseData?.page4?.dailyTrackingOthersSpecify;
      return (
        dailyTracking.includes("Others (please specify)") &&
        othersComment &&
        othersComment.trim().length > 0
      );
    })
    .map((response) => {
      const responseData = response.responseData as SurveyFormData;
      const searchQueries = responseData?.searchQueries || [];
      const comment = responseData?.page4?.dailyTrackingOthersSpecify || "";

      return {
        searchQueryCount: searchQueries.length,
        comment: comment.trim(),
      };
    });

  // Sort by search query count descending
  const sortedOthersResponses = othersResponses.sort(
    (a, b) => b.searchQueryCount - a.searchQueryCount,
  );

  // Create stats grid items and sort by popularity (all users percentage)
  const statsGridItems: StatsGridItem[] = q4Options
    .map((option) => ({
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
    }))
    .sort((a, b) => b.allUsers.percentage - a.allUsers.percentage);

  return (
    <div className="space-y-6">
      <QuestionCard title="What would you track every day if you use 30 Day Me? (Q4)">
        <StatsGrid items={statsGridItems} />
        <div className="mt-8">
          <h3 className="leading-none font-semibold">
            Others (please specify)
          </h3>
          <CommentsTable
            data={sortedOthersResponses}
            totalResponses={ageFilteredResponses.length}
            emptyMessage='No "others" comments provided in the current selection.'
          />
        </div>
      </QuestionCard>
    </div>
  );
}
