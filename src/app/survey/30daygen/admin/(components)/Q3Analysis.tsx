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
import type { SurveyFormData } from "../../types";
import { getComprehensiveAnalysis } from "../analysis";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

interface Q3AnalysisProps {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}

export function Q3Analysis({
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Search Feature Usage Intent (Q3)</CardTitle>
        <CardDescription>
          {filterOption !== "all" &&
            `Filtered for ${ageRangeLabels[filterOption]} age group`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              Would you use the AI challenge search feature?
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {q3Options.map((option) => (
              <Card key={option} className={`${getCardColor(option)}`}>
                <CardContent className="p-4">
                  <h4 className="text-md mb-4 text-center font-semibold">
                    {option}
                  </h4>

                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">All Users</p>
                      <p className="text-lg font-bold">
                        {allDistribution[option]?.percentage.toFixed(1)}%
                      </p>
                      <p className="text-muted-foreground text-xs">
                        ({allDistribution[option]?.count} responses)
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">
                        ≥3 Queries
                      </p>
                      <p className="text-lg font-bold">
                        {min3Distribution[option]?.percentage.toFixed(1)}%
                      </p>
                      <p className="text-muted-foreground text-xs">
                        ({min3Distribution[option]?.count} responses)
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">
                        ≥5 Queries
                      </p>
                      <p className="text-lg font-bold">
                        {min5Distribution[option]?.percentage.toFixed(1)}%
                      </p>
                      <p className="text-muted-foreground text-xs">
                        ({min5Distribution[option]?.count} responses)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
