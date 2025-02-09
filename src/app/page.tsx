"use client";

// import { CreateChallenge } from "@/components/ChallengeForms";
// import { ChallengeListGrid } from "@/components/ChallengeListGrid";
// import { ViewChallenge } from "@/components/ViewChallenge";
// import { CGetChallenges } from "@/lib/db/challenge";
// import { CFindUserByClerkId } from "@/lib/db/user";
import { useUser } from "@clerk/nextjs";
import { useParams, usePathname, useSearchParams } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";

const Challenges = () => {
  const searchParams = useSearchParams();

  const challengeId = searchParams.get("challenge");

  // const challenges = await CGetChallenges(user.id);

  // const currentChallenge = challenges.find((c) => c.id === challengeId);

  // if (challengeId === "new") {
  //   return <CreateChallenge />;
  // }

  return (
    <>
      {/* {currentChallenge ? (
        <ViewChallenge challenge={currentChallenge} />
      ) : (
        <ChallengeListGrid challenges={challenges} />
      )} */}
    </>
  );
};

export default function Page(props: ChallengePageProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading user data</div>;
  }

  return (
    <div className="my-6 flex flex-1 items-center justify-center">
      <Challenges pageProps={props} />
    </div>
  );
}
