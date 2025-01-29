import Calendar from "@/components/Calendar";
import { CreateChallenge, EditChallenge } from "@/components/ChallengeForms";
import { getChallenges } from "@/lib/db/challenge";
import { viewDailyProgressCompletion } from "@/lib/db/dailyProgress";
import { findUserByClerkId } from "@/lib/db/user";
import { createCalendarDates } from "@/lib/util/dates";
import { auth } from "@clerk/nextjs/server";
import { type Challenge } from "@prisma/client";

const ViewChallenge = async ({ challenge }: { challenge: Challenge }) => {
  const { userId: clerkId } = await auth();
  const user = await findUserByClerkId(clerkId!);

  const dailyProgress = await viewDailyProgressCompletion(
    user.id,
    challenge.id
  );

  return (
    <div>
      <Calendar challenge={challenge} dailyProgress={dailyProgress} />
    </div>
  );
};

export default async function Page() {
  const { userId: clerkId } = await auth();
  const user = await findUserByClerkId(clerkId!);

  const challenges = await getChallenges(user.id);

  return (
    <div className="flex-1 flex items-center justify-center">
      {challenges.length ? (
        <ViewChallenge challenge={challenges[0]} />
      ) : (
        <CreateChallenge />
      )}
    </div>
  );
}
