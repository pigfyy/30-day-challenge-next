import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "RMV469Q2GF.me.30day.app",
          paths: ["/l/*"],
        },
      ],
    },
    activitycontinuation: {
      apps: ["RMV469Q2GF.me.30day.app"],
    },
    webcredentials: {
      apps: ["RMV469Q2GF.me.30day.app"],
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
