"use client";

import { CreateChallenge } from "@/components/ChallengeForms";
import { ChallengeListGrid } from "@/components/ChallengeListGrid";
import { ViewChallenge } from "@/components/ViewChallenge";
import { trpc } from "@/lib/util/trpc";
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

  if (challengeId === "new") {
    return <CreateChallenge />;
  }

  if (!challengeId) {
    return <ChallengeListGrid />;
  }

  return <ViewChallenge />;
};

// const Challenges = () => {
//   const searchParams = useSearchParams();

//   const challengeId = searchParams.get("challenge");

//   const challenges = await CGetChallenges(user.id);

//   const currentChallenge = challenges.find((c) => c.id === challengeId);

//   if (challengeId === "new") {
//     return <CreateChallenge />;
//   }

//   return (
//     <>
//       {currentChallenge ? (
//         <ViewChallenge challenge={currentChallenge} />
//       ) : (
//         <ChallengeListGrid challenges={challenges} />
//       )}
//     </>
//   );
// };

export default function Page() {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();

  if (!isLoading && !user) {
    throw new Error("User not found");
  }

  return (
    <div className="my-6 flex flex-1 items-center justify-center">
      <Challenges />
    </div>
  );
}
