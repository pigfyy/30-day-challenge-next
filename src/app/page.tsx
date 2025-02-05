import Calendar from "@/components/Calendar";
import { CreateChallenge } from "@/components/ChallengeForms";
import { ViewChallengeHeader } from "@/components/ViewChallengeHeader";
import { getChallenges } from "@/lib/db/challenge";
import { viewDailyProgressCompletion } from "@/lib/db/dailyProgress";
import { findUserByClerkId } from "@/lib/db/user";
import { auth } from "@clerk/nextjs/server";
import { type Challenge } from "@prisma/client";

const ViewChallenge = async ({ challenge }: { challenge: Challenge }) => {
  const { userId: clerkId } = await auth();
  const user = await findUserByClerkId(clerkId!);

  const dailyProgress = await viewDailyProgressCompletion(
    user.id,
    challenge.id,
  );

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <ViewChallengeHeader challenge={challenge} />
      <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-6">
        <Calendar challenge={challenge} dailyProgress={dailyProgress} />
      </div>
    </div>
  );
};

export default async function Page() {
  const { userId: clerkId } = await auth();
  const user = await findUserByClerkId(clerkId!);

  const challenges = await getChallenges(user.id);

  return (
    <div className="flex flex-1 items-center justify-center">
      {challenges.length ? (
        <ViewChallenge challenge={challenges[0]} />
      ) : (
        <CreateChallenge />
      )}
    </div>
  );
}
