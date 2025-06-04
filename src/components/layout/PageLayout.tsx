"use client";

import { Home } from "@/components/Home";
import { CreateChallenge } from "@/components/molecule/challenge-form/CreateChallenge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ViewChallenge } from "@/components/ViewChallenge";
import { useUrlState } from "@/hooks/use-url-state";
import { useUser } from "@clerk/nextjs";
import { Suspense } from "react";

const Challenges = () => {
  const { getQueryParam } = useUrlState();

  const challengeId = getQueryParam("challenge");

  if (challengeId === "new") {
    return <CreateChallenge />;
  }

  if (!challengeId) {
    return <Home />;
  }

  return <ViewChallenge />;
};

export function PageLayout() {
  const user = useUser();

  if (!user.isSignedIn) {
    return <Home />;
  }

  return (
    <>
      <div className="my-6 flex flex-1 items-center justify-center">
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <Challenges />
        </Suspense>
      </div>
    </>
  );
}
