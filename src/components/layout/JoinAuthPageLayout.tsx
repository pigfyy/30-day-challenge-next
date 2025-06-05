"use client";

import InAppBrowserWarning from "@/components/molecule/InAppBrowserWarning";
import { SignIn } from "@/components/molecule/auth/SignIn";
import { SignUp } from "@/components/molecule/auth/SignUp";

interface JoinAuthPageLayoutProps {
  challengeId: string;
  organizationName?: string;
  type?: string | string[] | undefined;
}

export default function JoinAuthPageLayout({
  challengeId,
  organizationName,
  type,
}: JoinAuthPageLayoutProps) {
  const welcomeMessage = organizationName ? (
    <>
      <strong>{organizationName}</strong> has invited you to join a challenge.
    </>
  ) : (
    "You've been invited to join a challenge."
  );

  return (
    <div className="my-10 flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="text-md mb-5 text-gray-500">{welcomeMessage}</p>
      <InAppBrowserWarning />
      {type === "sign-in" ? <SignIn /> : <SignUp />}
    </div>
  );
}
