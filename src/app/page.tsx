"use client";

import { ChallengeListGrid } from "@/components/ChallengeListGrid";
import { CreateChallenge } from "@/components/molecule/challenge-form/CreateChallenge";
import { ViewChallenge } from "@/components/ViewChallenge";
import { trpc } from "@/lib/util/trpc";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Challenges = () => {
  const { data: challenges, isLoading: isChallengesLoading } =
    trpc.challenge.getChallenges.useQuery();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const challengeId = searchParams.get("challenge");

  useEffect(() => {
    if (!isChallengesLoading && (!challenges || !challenges.length)) {
      const params = new URLSearchParams(searchParams);
      params.set("challenge", "new");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [isChallengesLoading, challenges, searchParams, pathname, replace]);

  if (isChallengesLoading) {
    return <Loader2 className="h-12 w-12 animate-spin" />;
  }

  if (challengeId === "new") {
    return <CreateChallenge />;
  }

  if (!challengeId) {
    return <ChallengeListGrid />;
  }

  return <ViewChallenge />;
};

export default function Page() {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();

  if (!isLoading && !user) {
    throw new Error("User not found");
  }

  return (
    <>
      <div className="my-6 flex flex-1 items-center justify-center">
        <Challenges />
      </div>
    </>
  );
}
