"use client";

import { useEffect, useState } from "react";
import { SignUp } from "@clerk/nextjs";
import InApp from "detect-inapp";

export default function Page() {
  const [isInAppBrowserClient, setIsInAppBrowserClient] = useState(false);

  useEffect(() => {
    const inapp = new InApp(navigator.userAgent || "");

    const isInApp = inapp.isInApp;
    setIsInAppBrowserClient(isInApp);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
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
                the link and paste it into your browser or click on the
                top-right ellipsis and select Open in Browser
              </p>
            </div>
          </div>
        )}
        <SignUp forceRedirectUrl={"/app?challenge=new"} signInUrl="/sign-in" />
      </div>
    </div>
  );
}
