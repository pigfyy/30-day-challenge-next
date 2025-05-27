import { db, surveyResponse } from "@/lib/db/drizzle";
import { z } from "zod";
import { procedure, router } from "../init";

// Define the survey data schema for validation
const surveyDataSchema = z.object({
  page1: z
    .object({
      email: z.string().optional(),
      age: z.union([z.number(), z.string()]).optional(),
    })
    .optional(),
  page3: z
    .object({
      q1: z.string(),
      q2: z.string(),
      q3: z.string(),
      q4: z.string(),
      q5: z.string(),
      q6: z.string(),
    })
    .optional(),
  page4: z
    .object({
      seeYourselfUsing: z.string(),
      whyNotUsing: z.string().optional(),
      dailyTracking: z.array(z.string()),
      dailyTrackingOthersSpecify: z.string().optional(),
      engagementFeatures: z.array(z.string()),
      othersSpecify: z.string().optional(),
      habitChange: z.string(),
      appStoreEngagement: z.string(),
      additionalComments: z.string().optional(),
    })
    .optional(),
});

export const surveyResponseRouter = router({
  create: procedure.input(surveyDataSchema).mutation(async ({ input }) => {
    try {
      const result = await db
        .insert(surveyResponse)
        .values({
          responseData: input,
        })
        .returning();

      return {
        success: true,
        id: result[0].id,
      };
    } catch (error) {
      console.error("Error saving survey response:", error);
      throw new Error("Failed to save survey response");
    }
  }),
});
