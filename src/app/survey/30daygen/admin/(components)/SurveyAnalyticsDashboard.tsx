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
import { filterResponsesBySearchQueries, getLankarAverages } from "../analysis";
import type { InferSelectModel } from "drizzle-orm";
import type { surveyResponse } from "@/lib/db/drizzle";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface SurveyAnalyticsDashboardProps {
  responses: SurveyResponseData[];
}

type FilterOption = "all" | "min3" | "min5";

export function SurveyAnalyticsDashboard({
  responses,
}: SurveyAnalyticsDashboardProps) {
  const [filterOption, setFilterOption] = useState<FilterOption>("all");

  const { filteredResponses, lankarAverages, filterStats } = useMemo(() => {
    let filtered = responses;

    if (filterOption === "min3") {
      filtered = filterResponsesBySearchQueries(responses, 3);
    } else if (filterOption === "min5") {
      filtered = filterResponsesBySearchQueries(responses, 5);
    }

    const averages = getLankarAverages(filtered);

    // Calculate filter stats for display
    const min3Count = filterResponsesBySearchQueries(responses, 3).length;
    const min5Count = filterResponsesBySearchQueries(responses, 5).length;

    return {
      filteredResponses: filtered,
      lankarAverages: averages,
      filterStats: {
        total: responses.length,
        min3: min3Count,
        min5: min5Count,
      },
    };
  }, [responses, filterOption]);

  const questionLabels = {
    q2a: "I'm satisfied with the challenge search system.",
    q2b: "The recommended challenges are clear and understandable.",
    q2c: "The recommended challenges are relevant to the searched goal.",
    q2d: "Following challenges recommended by the system would help achieve the searched goal.",
    q2e: "The search latency is acceptable.",
  };

  const formatAverage = (value: number) => {
    return value.toFixed(2);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getFilterDescription = () => {
    switch (filterOption) {
      case "min3":
        return `Analyzing ${filteredResponses.length} of ${responses.length} responses (${((filteredResponses.length / responses.length) * 100).toFixed(1)}%)`;
      case "min5":
        return `Analyzing ${filteredResponses.length} of ${responses.length} responses (${((filteredResponses.length / responses.length) * 100).toFixed(1)}%)`;
      default:
        return `Analyzing all ${responses.length} responses`;
    }
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
          <CardTitle className="text-lg">Analysis Filters</CardTitle>
          <CardDescription>
            Configure which responses to include in the analysis based on search
            engagement
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
                  All responses
                  <span className="text-muted-foreground ml-2 text-sm">
                    ({filterStats.total} responses)
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="min3" id="filter-min3" />
                <Label htmlFor="filter-min3" className="flex-1">
                  Users who tried ≥3 search queries
                  <span className="text-muted-foreground ml-2 text-sm">
                    ({filterStats.min3} responses,{" "}
                    {((filterStats.min3 / filterStats.total) * 100).toFixed(1)}
                    %)
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="min5" id="filter-min5" />
                <Label htmlFor="filter-min5" className="flex-1">
                  Users who tried ≥5 search queries
                  <span className="text-muted-foreground ml-2 text-sm">
                    ({filterStats.min5} responses,{" "}
                    {((filterStats.min5 / filterStats.total) * 100).toFixed(1)}
                    %)
                  </span>
                </Label>
              </div>
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
          <CardTitle>Likert Scale Averages (Page 3 Questions)</CardTitle>
          <CardDescription>
            Average scores on a scale of 1-5 for GenAI search system questions
            {filterOption !== "all" && " (filtered for engaged users only)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(questionLabels).map(([questionKey, label]) => {
              const average = lankarAverages[questionKey] || 0;
              return (
                <div
                  key={questionKey}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium">{label}</p>
                    <p className="text-muted-foreground text-sm">
                      Question {questionKey.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(average)}`}
                    >
                      {formatAverage(average)}
                    </div>
                    <div className="text-muted-foreground text-sm">/ 5.00</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatAverage(
                Object.values(lankarAverages).reduce(
                  (sum, val) => sum + val,
                  0,
                ) / Object.values(lankarAverages).length || 0,
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              Across all questions ({filteredResponses.length} responses)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Highest Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {Object.values(lankarAverages).length > 0
                ? formatAverage(Math.max(...Object.values(lankarAverages)))
                : "0.00"}
            </div>
            <p className="text-muted-foreground text-sm">
              {Object.values(lankarAverages).length > 0
                ? `${Object.entries(lankarAverages)
                    .find(
                      ([key, value]) =>
                        value === Math.max(...Object.values(lankarAverages)),
                    )?.[0]
                    ?.toUpperCase()} - Best performing question`
                : "Best performing question"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Lowest Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {Object.values(lankarAverages).length > 0
                ? formatAverage(Math.min(...Object.values(lankarAverages)))
                : "0.00"}
            </div>
            <p className="text-muted-foreground text-sm">
              {Object.values(lankarAverages).length > 0
                ? `${Object.entries(lankarAverages)
                    .find(
                      ([key, value]) =>
                        value === Math.min(...Object.values(lankarAverages)),
                    )?.[0]
                    ?.toUpperCase()} - Needs improvement`
                : "Needs improvement"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
