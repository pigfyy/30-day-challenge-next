"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getAgeRangeStats, getComprehensiveAnalysis } from "../analysis";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface SurveyAnalyticsDashboardProps {
  responses: SurveyResponseData[];
}

type FilterOption = "all" | "under-15" | "15-25" | "25-40" | "40-55" | "55+";

const ScoreDistribution = ({
  distribution,
}: {
  distribution: Record<number, number>;
}) => {
  const scores = [5, 4, 3, 2, 1];
  const getColorForScore = (score: number) => {
    switch (score) {
      case 5:
        return "bg-green-500";
      case 4:
        return "bg-green-300";
      case 3:
        return "bg-yellow-300";
      case 2:
        return "bg-orange-300";
      case 1:
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex w-16 scale-135 transform flex-col gap-0.5">
      {scores.map((score) => {
        const percentage = distribution[score] || 0;
        return (
          <div key={score} className="flex h-2 items-center gap-1">
            <span className="w-1 text-[8px] text-gray-500">{score}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-sm bg-gray-100">
              <div
                className={`h-full ${getColorForScore(score)} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-3 text-right text-[8px] text-gray-600">
              {percentage > 0 ? Math.round(percentage) : "0"}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Component for a single engagement level card
const EngagementCard = ({
  title,
  subtitle,
  count,
  average,
  distribution,
}: {
  title: string;
  subtitle: string;
  count: number;
  average: number;
  distribution: Record<number, number>;
}) => {
  const formatAverage = (value: number) => value.toFixed(2);

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex flex-1 flex-col gap-2 rounded-lg border p-4">
      <div className="mb-3 text-center">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-muted-foreground text-xs">{subtitle}</p>
        <p className="text-muted-foreground text-xs">({count} responses)</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <ScoreDistribution distribution={distribution} />
        <div className="text-right">
          <div className={`text-xl font-bold ${getScoreColor(average)}`}>
            {formatAverage(average)}
          </div>
          <div className="text-muted-foreground text-xs">/ 5.00</div>
        </div>
      </div>
    </div>
  );
};

const QuestionAnalysis = ({
  questionKey,
  label,
  analysisData,
}: {
  questionKey: string;
  label: string;
  analysisData: {
    all: {
      count: number;
      averages: Record<string, number>;
      distributions: Record<string, Record<number, number>>;
    };
    min3: {
      count: number;
      averages: Record<string, number>;
      distributions: Record<string, Record<number, number>>;
    };
    min5: {
      count: number;
      averages: Record<string, number>;
      distributions: Record<string, Record<number, number>>;
    };
  };
}) => {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="text-muted-foreground text-sm">
          Question {questionKey.toUpperCase()}
        </p>
      </div>
      <div className="flex gap-4">
        <EngagementCard
          title="All Users"
          subtitle="All responses"
          count={analysisData.all.count}
          average={analysisData.all.averages[questionKey] || 0}
          distribution={analysisData.all.distributions[questionKey] || {}}
        />
        <EngagementCard
          title="Engaged Users"
          subtitle="≥3 search queries"
          count={analysisData.min3.count}
          average={analysisData.min3.averages[questionKey] || 0}
          distribution={analysisData.min3.distributions[questionKey] || {}}
        />
        <EngagementCard
          title="Highly Engaged"
          subtitle="≥5 search queries"
          count={analysisData.min5.count}
          average={analysisData.min5.averages[questionKey] || 0}
          distribution={analysisData.min5.distributions[questionKey] || {}}
        />
      </div>
    </div>
  );
};

export function SurveyAnalyticsDashboard({
  responses,
}: SurveyAnalyticsDashboardProps) {
  const [filterOption, setFilterOption] = useState<FilterOption>("all");

  const { analysisData, ageStats } = useMemo(() => {
    const analysis = getComprehensiveAnalysis(responses, filterOption);
    const stats = getAgeRangeStats(responses);

    return {
      analysisData: analysis,
      ageStats: stats,
    };
  }, [responses, filterOption]);

  const questionLabels = {
    q2a: "I'm satisfied with the challenge search system.",
    q2b: "The recommended challenges are clear and understandable.",
    q2c: "The recommended challenges are relevant to the searched goal.",
    q2d: "Following challenges recommended by the system would help achieve the searched goal.",
    q2e: "The search latency is acceptable.",
  };

  const ageRangeLabels = {
    "under-15": "Under 15",
    "15-25": "15-25",
    "25-40": "25-40",
    "40-55": "40-55",
    "55+": "55+",
  };

  const getFilterDescription = () => {
    if (filterOption === "all") {
      return `Analyzing all ${responses.length} responses`;
    }

    const ageLabel =
      ageRangeLabels[filterOption as keyof typeof ageRangeLabels];
    const totalFiltered = analysisData.all.count;
    return `Analyzing ${totalFiltered} of ${responses.length} responses from age group ${ageLabel} (${((totalFiltered / responses.length) * 100).toFixed(1)}%)`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">30DayGen Survey Analytics</h1>
        <div className="text-muted-foreground text-sm">
          Total Responses: {responses.length}
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Age Demographics Filter</CardTitle>
          <CardDescription>
            Configure which responses to include in the analysis based on age
            demographics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RadioGroup
              value={filterOption}
              onValueChange={(value: FilterOption) => setFilterOption(value)}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="filter-all" />
                <Label htmlFor="filter-all" className="flex-1">
                  All age groups
                  <span className="text-muted-foreground ml-2 text-sm">
                    ({responses.length} responses)
                  </span>
                </Label>
              </div>
              {Object.entries(ageRangeLabels).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`filter-${value}`} />
                  <Label htmlFor={`filter-${value}`} className="flex-1">
                    {label}
                    <span className="text-muted-foreground ml-2 text-sm">
                      ({ageStats[value] || 0} responses,{" "}
                      {responses.length > 0
                        ? (
                            ((ageStats[value] || 0) / responses.length) *
                            100
                          ).toFixed(1)
                        : "0"}
                      %)
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="border-t pt-2">
              <p className="text-muted-foreground text-sm">
                {getFilterDescription()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Likert Scale Analysis by Search Engagement</CardTitle>
          <CardDescription>
            Average scores and distributions on a scale of 1-5 for GenAI search
            system questions, segmented by user search engagement levels
            {filterOption !== "all" &&
              ` (filtered for ${ageRangeLabels[filterOption as keyof typeof ageRangeLabels]} age group)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {Object.entries(questionLabels).map(([questionKey, label]) => (
              <QuestionAnalysis
                key={questionKey}
                questionKey={questionKey}
                label={label}
                analysisData={analysisData}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
