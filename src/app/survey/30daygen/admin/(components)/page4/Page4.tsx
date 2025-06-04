import { Q1Analysis } from "./Q1Analysis";
import { Q2Analysis } from "./Q2Analysis";
import { Q3Analysis } from "./Q3Analysis";
import { Q4Analysis } from "./Q4Analysis";
import { Q5Analysis } from "./Q5Analysis";
import { Q6Analysis } from "./Q6Analysis";
import type { surveyResponse } from "@/lib/db/drizzle";
import type { InferSelectModel } from "drizzle-orm";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

export default function Page4({
  responses,
  filterOption,
  ageRangeLabels,
}: {
  responses: SurveyResponseData[];
  filterOption: string;
  ageRangeLabels: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Q1Analysis
        responses={responses}
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
      <Q4Analysis
        responses={responses}
        filterOption={filterOption}
        ageRangeLabels={ageRangeLabels}
      />
      <Q5Analysis
        responses={responses}
        filterOption={filterOption}
        ageRangeLabels={ageRangeLabels}
      />
      <Q6Analysis
        responses={responses}
        filterOption={filterOption}
        ageRangeLabels={ageRangeLabels}
      />
    </div>
  );
}
