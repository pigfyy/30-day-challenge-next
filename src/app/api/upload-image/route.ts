import { uploadImage } from "@/lib/db/dailyProgress";
import { base64ToBlob } from "@/lib/util";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { base64 }: { base64: string } = await req.json();

  const url = await uploadImage(base64, "progress-image.png");

  return NextResponse.json({ url: url }, { status: 200 });
}
