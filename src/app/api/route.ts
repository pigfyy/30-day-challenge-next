import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json("success");
}
