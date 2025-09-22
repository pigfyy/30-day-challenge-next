import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { findUserById } from "@/lib/db/user";
import { z } from "zod";

const getUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = getUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 },
      );
    }

    const { userId } = validationResult.data;

    const foundUser = await findUserById(userId, true);

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(foundUser);

    return NextResponse.json(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
