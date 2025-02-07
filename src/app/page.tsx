import { CreateChallenge } from "@/components/ChallengeForms";
import { ChallengeListGrid } from "@/components/ChallengeListGrid";
import { ViewChallenge } from "@/components/ViewChallenge";
import { getChallenges } from "@/lib/db/challenge";
import { findUserByClerkId } from "@/lib/db/user";
import { auth } from "@clerk/nextjs/server";

const ChallengeList = async () => {
  const { userId: clerkId } = await auth();
  const user = await findUserByClerkId(clerkId!);

  const challenges = await getChallenges(user.id);

  return <ChallengeListGrid challenges={challenges} />;
};

export default async function Page() {
  const { userId: clerkId } = await auth();
  const user = await findUserByClerkId(clerkId!);

  const challenges = await getChallenges(user.id);

  return (
    <div className="flex flex-1 items-center justify-center">
      {challenges.length ? (
        <>
          <ChallengeList />
          {/* <ViewChallenge challenge={challenges[0]} /> */}
        </>
      ) : (
        <CreateChallenge />
      )}
    </div>
  );
}
