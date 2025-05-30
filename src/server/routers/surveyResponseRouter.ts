import { db, surveyResponse } from "@/lib/db/drizzle";
import { z } from "zod";
import { procedure, router } from "../init";

const surveyDataSchema = z
  .object({
    turkCode: z.string().optional(),
  })
  .passthrough();

export const surveyResponseRouter = router({
  create: procedure.input(surveyDataSchema).mutation(async ({ input }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { turkCode, ...responseData } = input;

      const result = await db
        .insert(surveyResponse)
        .values({
          responseData: responseData,
          turkCode: turkCode || null,
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
