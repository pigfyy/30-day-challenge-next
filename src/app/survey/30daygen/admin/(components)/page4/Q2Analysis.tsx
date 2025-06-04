"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { SurveyFormData } from "../../../types";
import { getComprehensiveAnalysis } from "../../analysis";
import QuestionCard from "../ui/QuestionCard";
import { StatsGrid, type StatsGridItem } from "../ui/StatsGrid";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface P4Q2AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q2Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: P4Q2AnalysisProps) {
  const analysisData = getComprehensiveAnalysis(responses, filterOption);

  const q2Options = [
    "Yes. It has helped me achieve my goals",
    "I have been seeing progress, but have not achieved my goals",
    "It is not obvious yet",
    "Not applicable, I have not used it",
  ];

  const getQ2DistributionForLevel = (responses: SurveyResponseData[]) => {
    return q2Options.reduce(
      (acc, option) => {
        const count = responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page4?.habitChange === option;
        }).length;

        const percentage =
          responses.length > 0 ? (count / responses.length) * 100 : 0;
        acc[option] = { count, percentage };
        return acc;
      },
      {} as Record<string, { count: number; percentage: number }>,
    );
  };

  const allDistribution = getQ2DistributionForLevel(analysisData.all.responses);
  const min3Distribution = getQ2DistributionForLevel(
    analysisData.min3.responses,
  );
  const min5Distribution = getQ2DistributionForLevel(
    analysisData.min5.responses,
  );

  const getCardColor = (option: string) => {
    if (option.includes("helped me achieve my goals"))
      return "border-green-200 bg-green-50";
    if (option.includes("seeing progress")) return "border-blue-200 bg-blue-50";
    if (option.includes("not obvious yet"))
      return "border-yellow-200 bg-yellow-50";
    return "border-gray-200 bg-gray-50";
  };

  // Create stats grid items
  const statsGridItems: StatsGridItem[] = q2Options.map((option) => ({
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
      <QuestionCard title="If you have already used 30 Day Me, do you think it is changing your habits? (Q2)">
        <StatsGrid items={statsGridItems} />
      </QuestionCard>
    </div>
  );
}
