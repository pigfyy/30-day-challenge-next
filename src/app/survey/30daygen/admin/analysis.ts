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

export const filterResponsesByAge = (
  responses: SurveyResponseData[],
  ageRange: string,
) => {
  if (ageRange === "all") {
    return responses;
  }

  return responses.filter((response) => {
    const responseData = response.responseData as SurveyFormData;
    const age = responseData?.page1?.age;
    return age === ageRange;
  });
};

export const getAgeRangeStats = (responses: SurveyResponseData[]) => {
  const ageRanges = ["under-15", "15-25", "25-40", "40-55", "55+"];
  const stats: Record<string, number> = {};

  ageRanges.forEach((range) => {
    stats[range] = responses.filter((response) => {
      const responseData = response.responseData as SurveyFormData;
      return responseData?.page1?.age === range;
    }).length;
  });

  return stats;
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

export const getScoreDistributions = (responses: SurveyResponseData[]) => {
  const questions = ["q2a", "q2b", "q2c", "q2d", "q2e"] as const;
  const distributions: Record<string, Record<number, number>> = {};

  questions.forEach((question) => {
    const values = responses
      .map((response) => {
        const responseData = response.responseData as SurveyFormData;
        return parseInt(responseData?.page3?.[question]);
      })
      .filter((value) => !isNaN(value));

    // Initialize distribution for this question
    distributions[question] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Count occurrences of each score
    values.forEach((score) => {
      if (score >= 1 && score <= 5) {
        distributions[question][score]++;
      }
    });

    // Convert counts to percentages
    const total = values.length;
    if (total > 0) {
      [1, 2, 3, 4, 5].forEach((score) => {
        distributions[question][score] =
          (distributions[question][score] / total) * 100;
      });
    }
  });

  return distributions;
};

// Get comprehensive data for all three search engagement levels
export const getComprehensiveAnalysis = (
  responses: SurveyResponseData[],
  ageFilter: string = "all",
) => {
  // First apply age filter
  const ageFilteredResponses = filterResponsesByAge(responses, ageFilter);

  // Then get data for each search engagement level
  const allResponses = ageFilteredResponses;
  const min3Responses = filterResponsesBySearchQueries(ageFilteredResponses, 3);
  const min5Responses = filterResponsesBySearchQueries(ageFilteredResponses, 5);

  return {
    all: {
      responses: allResponses,
      count: allResponses.length,
      averages: getLankarAverages(allResponses),
      distributions: getScoreDistributions(allResponses),
    },
    min3: {
      responses: min3Responses,
      count: min3Responses.length,
      averages: getLankarAverages(min3Responses),
      distributions: getScoreDistributions(min3Responses),
    },
    min5: {
      responses: min5Responses,
      count: min5Responses.length,
      averages: getLankarAverages(min5Responses),
      distributions: getScoreDistributions(min5Responses),
    },
  };
};
