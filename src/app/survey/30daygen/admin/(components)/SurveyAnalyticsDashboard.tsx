"use client";

import Page3 from "@/app/survey/30daygen/admin/(components)/page3/Page3";
import Page4 from "@/app/survey/30daygen/admin/(components)/page4/Page4";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { InferSelectModel } from "drizzle-orm";
import { useMemo, useState } from "react";
import { getAgeRangeStats, getComprehensiveAnalysis } from "../analysis";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface SurveyAnalyticsDashboardProps {
  responses: SurveyResponseData[];
}

type FilterOption = "all" | "under-15" | "15-25" | "25-40" | "40-55" | "55+";

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

      <PageSelector
        Page3={
          <Page3
            analysisData={analysisData}
            filterOption={filterOption}
            ageRangeLabels={ageRangeLabels}
            responses={responses}
          />
        }
        Page4={
          <Page4
            responses={responses}
            filterOption={filterOption}
            ageRangeLabels={ageRangeLabels}
          />
        }
      />
    </div>
  );
}

const PageSelector = ({
  Page3,
  Page4,
}: {
  Page3: React.ReactNode;
  Page4: React.ReactNode;
}) => {
  return (
    <Tabs defaultValue="page3" className="w-full">
      <TabsList className="grid h-14 w-full grid-cols-2">
        <TabsTrigger value="page3" className="h-12 text-lg font-bold">
          Search System Analysis
        </TabsTrigger>
        <TabsTrigger value="page4" className="h-12 text-lg font-bold">
          General App Analysis
        </TabsTrigger>
      </TabsList>
      <TabsContent value="page3" className="mt-6">
        {Page3}
      </TabsContent>
      <TabsContent value="page4" className="mt-6">
        {Page4}
      </TabsContent>
    </Tabs>
  );
};
