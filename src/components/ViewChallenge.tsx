import Calendar from "@/components/Calendar";
import { ViewChallengeHeader } from "@/components/ViewChallengeHeader";
import { viewDailyProgressCompletion } from "@/lib/db/dailyProgress";
import { findUserByClerkId } from "@/lib/db/user";
import { auth } from "@clerk/nextjs/server";
import { type Challenge } from "@prisma/client";

export const ViewChallenge = async ({
  challenge,
}: {
  challenge: Challenge;
}) => {
  const { userId: clerkId } = await auth();
  const user = await findUserByClerkId(clerkId!);

  const dailyProgress = await viewDailyProgressCompletion(
    user.id,
    challenge.id,
  );

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <ViewChallengeHeader
        challenge={challenge}
        dailyProgress={dailyProgress}
      />
      <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-6">
        <Calendar challenge={challenge} dailyProgress={dailyProgress} />
      </div>
    </div>
  );
};
