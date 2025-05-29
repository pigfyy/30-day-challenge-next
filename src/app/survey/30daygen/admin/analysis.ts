import { surveyResponse } from "@/lib/db/drizzle";
import type { InferSelectModel } from "drizzle-orm";
import type { SurveyFormData } from "../types";

type SurveyResponseData = InferSelectModel<typeof surveyResponse>;

export const filterResponsesBySearchQueries = (
  responses: SurveyResponseData[],
  minSearchQueries: number = 3,
) => {
  return responses.filter((response) => {
    const responseData = response.responseData as SurveyFormData;
    const searchQueries = responseData?.searchQueries || [];
    return searchQueries.length >= minSearchQueries;
  });
};

export const getLankarAverages = (responses: SurveyResponseData[]) => {
  const questions = ["q2a", "q2b", "q2c", "q2d", "q2e"] as const;

  const averages: Record<string, number> = {};

  questions.forEach((question) => {
    const values = responses
      .map((response) => {
        const responseData = response.responseData as SurveyFormData;
        return parseInt(responseData?.page3?.[question]);
      })
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const sum = values.reduce((acc, val) => acc + val, 0);
      averages[question] = sum / values.length;
    } else {
      averages[question] = 0;
    }
  });

  return averages;
};
