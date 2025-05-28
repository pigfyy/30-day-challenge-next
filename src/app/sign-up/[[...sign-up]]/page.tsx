"use client";

import { SignUp } from "@clerk/nextjs";
import InAppBrowserWarning from "@/components/molecules/InAppBrowserWarning";

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center pb-12 pt-8">
      <div className="flex w-full flex-col items-center justify-center">
        <InAppBrowserWarning />
        <SignUp forceRedirectUrl={"/app?challenge=new"} signInUrl="/sign-in" />
      </div>
    </div>
  );
}
