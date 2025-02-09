import Calendar from "@/components/Calendar";
import { ViewChallengeHeader } from "@/components/ViewChallengeHeader";
import { trpc } from "@/lib/util/trpc";
import { useSearchParams } from "next/navigation";
import { BackButton } from "./BackButton";

export const ViewChallenge = () => {
  const searchParams = useSearchParams();

  const challengeId = searchParams.get("challenge");

  const { data: challenges, isLoading: isChallengesLoading } =
    trpc.challenge.getChallenges.useQuery();
  const challenge = challenges?.find((c) => c.id === challengeId);
  const { data: dailyProgress } = trpc.dailyProgress.getDailyProgress.useQuery({
    challengeId: challengeId,
  });

  console.log(dailyProgress);

  if (!challenge || !dailyProgress) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-start justify-between">
        <BackButton />
      </div>
      <ViewChallengeHeader
        challenge={challenge}
        dailyProgress={dailyProgress}
      />
      <div className="mt-6 rounded-lg border border-neutral-100 bg-neutral-50 p-6">
        <Calendar challenge={challenge} dailyProgress={dailyProgress} />
      </div>
    </div>
  );
};
