import Calendar from "@/components/Calendar";
import { ViewChallengeHeader } from "@/components/ViewChallengeHeader";
import { trpc } from "@/lib/util/trpc";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BackButton } from "./BackButton";

export const ViewChallenge = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const challengeId = searchParams.get("challenge");

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

  if (!isLoading && !challenge) {
    const params = new URLSearchParams(searchParams);
    params.delete("challenge");
    replace(`${pathname}?${params.toString()}`);
    return null;
  }

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
