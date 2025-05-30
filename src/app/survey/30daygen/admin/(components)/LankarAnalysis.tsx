"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getComprehensiveAnalysis } from "../analysis";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";

// Component for visualizing score distribution
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
    <div className="flex w-20 flex-col gap-1">
      {scores.map((score) => {
        const percentage = distribution[score] || 0;
        return (
          <div key={score} className="flex h-2.5 items-center gap-1">
            <span className="w-1.5 text-[10px] text-gray-500">{score}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-sm bg-gray-100">
              <div
                className={`h-full ${getColorForScore(score)} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-4 text-right text-[10px] text-gray-600">
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
    <div className="flex min-w-[280px] flex-1 flex-col gap-2 rounded-lg border p-4 md:min-w-0">
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

// Component for a question with its three engagement levels
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
      <div className="flex gap-4 overflow-x-auto pb-2 md:gap-4">
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

interface LankarAnalysisProps {
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
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function LankarAnalysis({
  analysisData,
  filterOption,
  ageRangeLabels,
}: LankarAnalysisProps) {
  const questionLabels = {
    q2a: "I'm satisfied with the challenge search system.",
    q2b: "The recommended challenges are clear and understandable.",
    q2c: "The recommended challenges are relevant to the searched goal.",
    q2d: "Following challenges recommended by the system would help achieve the searched goal.",
    q2e: "The search latency is acceptable.",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Likert Scale Analysis by Search Engagement</CardTitle>
        <CardDescription>
          Average scores and distributions on a scale of 1-5 for GenAI search
          system questions, segmented by user search engagement levels
          {filterOption !== "all" &&
            ` (filtered for ${ageRangeLabels[filterOption]} age group)`}
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
  );
}
