"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import InAppBrowserWarning from "@/components/molecules/InAppBrowserWarning";

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
      {type === "sign-in" ? (
        <SignIn
          forceRedirectUrl={`/app/join/${challengeId}`}
          signUpUrl={`/join/${challengeId}?type=sign-up`}
          routing="hash"
        />
      ) : (
        <SignUp
          forceRedirectUrl={`/app/join/${challengeId}`}
          signInUrl={`/join/${challengeId}?type=sign-in`}
          routing="hash"
        />
      )}
    </div>
  );
}
