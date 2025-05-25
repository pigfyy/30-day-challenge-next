"use client";

import { Home } from "@/components/Home";
import { CreateChallenge } from "@/components/molecule/challenge-form/CreateChallenge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ViewChallenge } from "@/components/ViewChallenge";
import { useUrlState } from "@/hooks/use-url-state";
import { trpc } from "@/lib/util/trpc";
import { Suspense, useEffect } from "react";

const Challenges = () => {
  const { getQueryParam, updateQueryParam } = useUrlState();

  const challengeId = getQueryParam("challenge");

  const {
    data: challenges,
    isLoading: isChallengesLoading,
    error,
  } = trpc.challenge.getChallenges.useQuery(
    !challengeId ? { includeDailyProgressData: true } : undefined,
  );

  useEffect(() => {
    if (
      !isChallengesLoading &&
      (!challenges || !challenges.length) &&
      challengeId !== "new"
    ) {
      updateQueryParam("challenge", "new");
    }
  }, [isChallengesLoading, challenges, updateQueryParam, challengeId]);

  if (isChallengesLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (challengeId === "new") {
    return <CreateChallenge />;
  }

  if (!challengeId) {
    return <Home />;
  }

  return <ViewChallenge />;
};

export function PageLayout() {
  const { data: user, isLoading } = trpc.user.getUser.useQuery(undefined, {
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <div className="my-6 flex flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="my-6 flex flex-1 items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="mx-auto" />
          <p className="mt-4 text-gray-600">
            Setting up your account. This might take a moment...
          </p>
        </div>
      </div>
    );
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
