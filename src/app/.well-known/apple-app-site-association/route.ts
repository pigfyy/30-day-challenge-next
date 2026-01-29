import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "1066607225.me.30day.app",
          paths: ["/*"],
        },
      ],
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
