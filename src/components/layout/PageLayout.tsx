"use client";

import { ChallengeList } from "@/components/ChallengeGrid";
import { CreateChallenge } from "@/components/molecule/challenge-form/CreateChallenge";
import { ViewChallenge } from "@/components/ViewChallenge";
import { useUrlState } from "@/hooks/use-url-state";
import { trpc } from "@/lib/util/trpc";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

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
    return <Loader2 className="h-12 w-12 animate-spin" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (challengeId === "new") {
    return <CreateChallenge />;
  }

  if (!challengeId) {
    return <ChallengeList />;
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
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="my-6 flex flex-1 items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
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
        <Challenges />
      </div>
    </>
  );
}
