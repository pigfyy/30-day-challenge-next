import Calendar from "@/components/Calendar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ViewChallengeHeader } from "@/components/ViewChallengeHeader";
import { SwipeDirection, useEdgeSwipe } from "@/hooks/use-edge-swipe";
import { useUrlState } from "@/hooks/use-url-state";
import { trpc } from "@/lib/util/trpc";
import { useEffect, useState } from "react";
import { BackButton } from "./BackButton";

const handleSwipe = (
  direction: SwipeDirection,
  challenges: any[] | undefined,
  currentChallengeId: string | null,
  updateQueryParam: (key: string, value: string) => void,
  utils: ReturnType<typeof trpc.useUtils>,
) => {
  if (!challenges || !currentChallengeId) return;

  const currentIndex = challenges.findIndex((c) => c.id === currentChallengeId);
  if (currentIndex === -1) return;

  let nextIndex: number;
  if (direction === SwipeDirection.LEFT) {
    // Move to next challenge (or wrap around to first)
    nextIndex = (currentIndex + 1) % challenges.length;
  } else {
    // Move to previous challenge (or wrap around to last)
    nextIndex = (currentIndex - 1 + challenges.length) % challenges.length;
  }

  const nextChallenge = challenges[nextIndex];

  // Prefetch the next challenge's data
  utils.dailyProgress.getDailyProgress.prefetch({
    challengeId: nextChallenge.id,
  });

  updateQueryParam("challenge", nextChallenge.id);
};

export const ViewChallenge = () => {
  const { getQueryParam, removeQueryParam, updateQueryParam } = useUrlState();
  const utils = trpc.useUtils();
  const [isNavigating, setIsNavigating] = useState(false);

  const { data: challenges, isLoading: isChallengesLoading } =
    trpc.challenge.getChallenges.useQuery();

  const { containerRef, bind, style } = useEdgeSwipe({
    onSwipe: (direction) => {
      setIsNavigating(true);
      handleSwipe(
        direction,
        challenges,
        getQueryParam("challenge"),
        updateQueryParam,
        utils,
      );

      setTimeout(() => setIsNavigating(false), 300);
    },
  });

  const challengeId = getQueryParam("challenge");

  const challenge = challenges?.find((c) => c.id === challengeId);

  const { data: dailyProgress, isLoading: isDailyProgressLoading } =
    trpc.dailyProgress.getDailyProgress.useQuery(
      { challengeId: challengeId },
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
    return <LoadingSpinner />;
  }

  return (
    <div
      ref={containerRef}
      {...bind()}
      style={style}
      className={`m-2 w-full rounded-lg bg-white p-2 shadow-lg transition-opacity duration-300 sm:p-4 md:mx-auto md:w-5/6 md:p-5 lg:w-2/3 lg:p-6 xl:w-1/2 2xl:w-[45%] ${
        isNavigating ? "opacity-50" : "opacity-100"
      }`}
    >
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
