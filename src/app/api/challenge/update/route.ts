import { updateChallenge } from "@/lib/prisma/challenge";
import { handleError, validateRequest } from "@/lib/util/routeUtils";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  title: z.string(),
  wish: z.string(),
  dailyAction: z.string(),
  icon: z.string(),
});

export async function PUT(req: Request) {
  try {
    const parsedData = await validateRequest(schema, req);

    const data = await updateChallenge(parsedData);

    return NextResponse.json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    handleError(error);
  }
}
