"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { SurveyFormData } from "../../../types";
import { getComprehensiveAnalysis } from "../../analysis";
import QuestionCard from "../ui/QuestionCard";
import { StatsGrid, type StatsGridItem } from "../ui/StatsGrid";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface P4Q5AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q5Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: P4Q5AnalysisProps) {
  const analysisData = getComprehensiveAnalysis(responses, filterOption);

  const q5Options = [
    "Yes, I will only use the app if it is published to app stores",
    "Yes, I would be more likely to use the app if it is published to app stores",
    "No, I am okay with installing the app as a shortcut and adding it to the app store will not change my engagement",
  ];

  const getQ5DistributionForLevel = (responses: SurveyResponseData[]) => {
    return q5Options.reduce(
      (acc, option) => {
        const count = responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page4?.appStoreEngagement === option;
        }).length;

        const percentage =
          responses.length > 0 ? (count / responses.length) * 100 : 0;
        acc[option] = { count, percentage };
        return acc;
      },
      {} as Record<string, { count: number; percentage: number }>,
    );
  };

  const allDistribution = getQ5DistributionForLevel(analysisData.all.responses);
  const min3Distribution = getQ5DistributionForLevel(
    analysisData.min3.responses,
  );
  const min5Distribution = getQ5DistributionForLevel(
    analysisData.min5.responses,
  );

  const getCardColor = (option: string) => {
    if (option.includes("will only use")) return "border-red-200 bg-red-50";
    if (option.includes("more likely")) return "border-orange-200 bg-orange-50";
    return "border-green-200 bg-green-50"; // okay with shortcut
  };

  // Create stats grid items
  const statsGridItems: StatsGridItem[] = q5Options.map((option) => ({
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
    <QuestionCard title="Currently the app can be installed as a shortcut on your phone. If we publish the app to app stores, will it change your engagement? (Q5)">
      <StatsGrid items={statsGridItems} />
    </QuestionCard>
  );
}
