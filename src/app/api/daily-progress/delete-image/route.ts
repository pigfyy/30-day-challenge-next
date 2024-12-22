import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url }: { url: string } = await req.json();

  await del(url);

  return NextResponse.json(
    { message: "Image successfully deleted" },
    { status: 200 }
  );
}
