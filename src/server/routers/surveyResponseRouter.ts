import { db, surveyResponse } from "@/lib/db/drizzle";
import { z } from "zod";
import { procedure, router } from "../init";

// Define the survey data schema for validation
const surveyDataSchema = z.any();

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
