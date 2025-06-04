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

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface Q3AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q2Analysis({
  responses,
  filterOption,
  ageRangeLabels,
}: Q3AnalysisProps) {
  // Get comprehensive analysis for engagement levels
  const analysisData = getComprehensiveAnalysis(responses, filterOption);

  const q3Options = [
    "Yes, I will directly join the recommended challenges",
    "Yes, but I will edit and tailor them to my own needs",
    "No, I prefer to make my own challenges",
  ];

  // Calculate Q3 distribution for each engagement level
  const getQ3DistributionForLevel = (responses: SurveyResponseData[]) => {
    return q3Options.reduce(
      (acc, option) => {
        const count = responses.filter((response) => {
          const responseData = response.responseData as SurveyFormData;
          return responseData?.page3?.q3 === option;
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
    if (option.includes("directly join")) return "border-green-200 bg-green-50";
    if (option.includes("edit and tailor")) return "border-blue-200 bg-blue-50";
    return "border-orange-200 bg-orange-50";
  };

  // Create stats grid items
  const statsGridItems: StatsGridItem[] = q3Options.map((option) => ({
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
    <QuestionCard title="Would you use the AI challenge search feature? (Q2)">
      <StatsGrid items={statsGridItems} />
    </QuestionCard>
  );
}
