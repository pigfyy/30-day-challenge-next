"use client";

import { useEffect, useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import InApp from "detect-inapp";

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
  const [isInAppBrowserClient, setIsInAppBrowserClient] = useState(false);

  useEffect(() => {
    const inapp = new InApp(navigator.userAgent || "");

    const isInApp = inapp.isInApp;
    setIsInAppBrowserClient(isInApp);
  }, []);

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
      {isInAppBrowserClient && (
        <div className="mb-4 rounded bg-yellow-100 p-3 text-center text-yellow-700">
          <p>
            It looks like you&apos;re in an in-app browser. To be able to use
            Sign In with Google, please either copy the link and paste it into
            your browser or click on the top-right ellipsis and select Open in
            Browser
          </p>
        </div>
      )}
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
