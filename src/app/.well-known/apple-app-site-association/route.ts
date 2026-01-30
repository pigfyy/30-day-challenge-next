import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "1066607225.me.30day.app",
          paths: ["/l/*"],
        },
      ],
    },
    activitycontinuation: {
      apps: ["1066607225.me.30day.app"],
    },
    webcredentials: {
      apps: ["1066607225.me.30day.app"],
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
