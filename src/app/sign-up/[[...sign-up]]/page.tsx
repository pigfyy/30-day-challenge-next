"use client";

import { SignUp } from "@/components/molecule/auth/SignUp";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = authClient.useSession();

  if (session) {
    redirect("/app");
  }

  return <SignUp />;
}
