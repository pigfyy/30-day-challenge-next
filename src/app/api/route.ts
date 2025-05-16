import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db/drizzle";

export async function GET(req: Request) {
  const data = await db.query.user.findMany();

  return NextResponse.json(data);
}
