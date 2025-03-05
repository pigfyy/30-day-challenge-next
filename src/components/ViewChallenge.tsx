import Calendar from "@/components/Calendar";
import { ViewChallengeHeader } from "@/components/ViewChallengeHeader";
import { useUrlState } from "@/hooks/use-url-state";
import { trpc } from "@/lib/util/trpc";
import { Loader2 } from "lucide-react";
import { BackButton } from "./BackButton";
import { useEffect } from "react";

export const ViewChallenge = () => {
  const { searchParams, getQueryParam, removeQueryParam } = useUrlState();

  const challengeId = getQueryParam("challenge");

  const { data: challenges, isLoading: isChallengesLoading } =
    trpc.challenge.getChallenges.useQuery();
  const challenge = challenges?.find((c) => c.id === challengeId);

  const { data: dailyProgress, isLoading: isDailyProgressLoading } =
    trpc.dailyProgress.getDailyProgress.useQuery(
      {
        challengeId: challengeId,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
      },
    );

  const isLoading = isChallengesLoading || isDailyProgressLoading;

  useEffect(() => {
    if (!isLoading && !challenge && challengeId) {
      removeQueryParam("challenge");
    }
  }, [isLoading, challenge, challengeId, removeQueryParam]);

  if (isLoading || !challenge || !dailyProgress) {
    return <Loader2 className="h-12 w-12 animate-spin" />;
  }

  return (
    <div className="m-2 w-full rounded-lg bg-white p-2 shadow-lg sm:p-4 md:mx-auto md:w-5/6 md:p-5 lg:w-2/3 lg:p-6 xl:w-1/2 2xl:w-[45%]">
      <div className="mb-6 flex items-start justify-between">
        <BackButton />
      </div>
      <ViewChallengeHeader />
      <div className="mt-6 rounded-lg border border-neutral-100 bg-neutral-50 p-1 sm:p-4 lg:p-8">
        <Calendar challenge={challenge} dailyProgress={dailyProgress} />
      </div>
    </div>
  );
};
