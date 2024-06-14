import { createChallenge } from "@/lib/db/challenge";
import { findUserByClerkId } from "@/lib/db/user";
import { handleError, validateRequest } from "@/lib/util/routeUtils";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  wish: z.string(),
  dailyAction: z.string(),
  icon: z.string(),
  clerkId: z.string(),
});

type schema = z.infer<typeof schema>;

const handleValidatedData = async (data: schema) => {
  try {
    const { title, wish, dailyAction, icon, clerkId } = data;
    const { id } = await findUserByClerkId(clerkId);

    return await createChallenge({
      title: title,
      wish: wish,
      dailyAction: dailyAction,
      userId: id,
      icon,
    });
  } catch (e) {
    throw new Error("Failed to create challenge");
  }
};

export async function PUT(req: Request) {
  try {
    const parsedData = await validateRequest(schema, req);

    const data = await handleValidatedData(parsedData);

    return NextResponse.json({
      message: "Challenge created successfully",
      data: data,
    });
  } catch (error) {
    handleError(error);
  }
}
