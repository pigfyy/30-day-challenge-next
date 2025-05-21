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
        <div className="animated-wavy-border mb-4 rounded p-0.5 text-center">
          <style jsx>{`
            @keyframes wavyBorderAnimation {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animated-wavy-border {
              background-image: linear-gradient(
                to right,
                #fcd34d,
                /* amber-300 */ #fbbf24,
                /* amber-400 */ #f59e0b,
                /* amber-500 */ #d97706,
                /* amber-600 */ #b45309,
                /* amber-700 */ #f59e0b,
                /* amber-500 */ #fbbf24,
                /* amber-400 */ #fcd34d /* amber-300 */
              );
              background-size: 250% auto;
              animation: wavyBorderAnimation 3s linear infinite;
            }
          `}</style>
          <div className="rounded bg-yellow-200 p-2.5">
            <p className="mb-1 text-lg font-bold uppercase text-yellow-900">
              Warning
            </p>
            <p className="text-yellow-800">
              It looks like you&apos;re in an in-app browser. To be able to
              create an account or use Sign In with Google, please either copy
              the link and paste it into your browser or click on the top-right
              ellipsis and select Open in Browser
            </p>
          </div>
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
