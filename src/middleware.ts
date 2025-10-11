import { betterFetch } from "@better-fetch/fetch";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Session = {
  user: { id: string; email: string; name?: string };
  session: { id: string; userId: string; expiresAt: string };
};

export default async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (!session && request.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (session && ["/sign-in", "/sign-up"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (!session && request.nextUrl.pathname.startsWith("/api/protected")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/sign-in", "/sign-up", "/api/protected/:path*"],
};
