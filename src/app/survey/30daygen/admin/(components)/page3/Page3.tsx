import { Q2Analysis } from "@/app/survey/30daygen/admin/(components)/page3/Q2Analysis";
import { Q3Analysis } from "@/app/survey/30daygen/admin/(components)/page3/Q3Analysis";
import { LankarAnalysis } from "@/app/survey/30daygen/admin/(components)/page3/LankarAnalysis";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { InferSelectModel } from "drizzle-orm";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

export default function Page3({
  analysisData,
  filterOption,
  ageRangeLabels,
  responses,
}: {
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
  responses: SurveyResponseData[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <LankarAnalysis
        analysisData={analysisData}
        filterOption={filterOption}
        ageRangeLabels={ageRangeLabels}
      />

      <Q2Analysis
        responses={responses}
        filterOption={filterOption}
        ageRangeLabels={ageRangeLabels}
      />

      <Q3Analysis
        responses={responses}
        filterOption={filterOption}
        ageRangeLabels={ageRangeLabels}
      />
    </div>
  );
}
