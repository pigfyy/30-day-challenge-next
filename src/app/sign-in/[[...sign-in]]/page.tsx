"use client";

import { SignIn } from "@/components/molecule/auth/SignIn";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = authClient.useSession();

  if (session) {
    redirect("/app");
  }

  return <SignIn />;
}
