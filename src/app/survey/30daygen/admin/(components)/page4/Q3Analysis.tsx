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

interface P4Q3AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q3Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: P4Q3AnalysisProps) {
  const analysisData = getComprehensiveAnalysis(responses, filterOption);

  const q3Options = [
    "No more features needed",
    "Notifications",
    "Leaderboard",
    "Streaks",
    "Community",
    "Personal coaches",
    "Others (please specify)",
  ];

  const getQ3DistributionForLevel = (responses: SurveyResponseData[]) => {
    return q3Options.reduce(
      (acc, option) => {
        const count = responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          const engagementFeatures =
            responseData?.page4?.engagementFeatures || [];
          return engagementFeatures.includes(option);
        }).length;

        const percentage =
          responses.length > 0 ? (count / responses.length) * 100 : 0;
        acc[option] = { count, percentage };
        return acc;
      },
      {} as Record<string, { count: number; percentage: number }>,
    );
  };

  const allDistribution = getQ3DistributionForLevel(analysisData.all.responses);
  const min3Distribution = getQ3DistributionForLevel(
    analysisData.min3.responses,
  );
  const min5Distribution = getQ3DistributionForLevel(
    analysisData.min5.responses,
  );

  const getCardColor = (option: string) => {
    if (option.includes("No more features"))
      return "border-gray-200 bg-gray-50";
    if (option.includes("Notifications")) return "border-blue-200 bg-blue-50";
    if (option.includes("Leaderboard")) return "border-purple-200 bg-purple-50";
    if (option.includes("Streaks")) return "border-orange-200 bg-orange-50";
    if (option.includes("Community")) return "border-green-200 bg-green-50";
    if (option.includes("Personal coaches"))
      return "border-indigo-200 bg-indigo-50";
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
      const engagementFeatures = responseData?.page4?.engagementFeatures || [];
      const othersComment = responseData?.page4?.othersSpecify;
      return (
        engagementFeatures.includes("Others (please specify)") &&
        othersComment &&
        othersComment.trim().length > 0
      );
    })
    .map((response) => {
      const responseData = response.responseData as SurveyFormData;
      const searchQueries = responseData?.searchQueries || [];
      const comment = responseData?.page4?.othersSpecify || "";

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
  const statsGridItems: StatsGridItem[] = q3Options
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
      <QuestionCard title="Which features would help make the app more engaging? (Q3)">
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
