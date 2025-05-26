"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BRONZE_BADGE_THRESHOLD,
  SILVER_BADGE_THRESHOLD,
  GOLD_BADGE_THRESHOLD,
} from "@/lib/constants";
import { trpc } from "@/lib/util/trpc";
import { cn } from "@/lib/utils";
import Image from "next/image";

const getBadgeData = (percentile: number) => {
  if (percentile >= GOLD_BADGE_THRESHOLD) {
    return {
      variant: "gold" as const,
      src: "/badges/gold.png",
      alt: "Gold Badge",
      name: "Gold",
    };
  } else if (percentile >= SILVER_BADGE_THRESHOLD) {
    return {
      variant: "silver" as const,
      src: "/badges/silver.png",
      alt: "Silver Badge",
      name: "Silver",
    };
  } else if (percentile >= BRONZE_BADGE_THRESHOLD) {
    return {
      variant: "bronze" as const,
      src: "/badges/bronze.png",
      alt: "Bronze Badge",
      name: "Bronze",
    };
  } else {
    return {
      variant: "iron" as const,
      src: "/badges/iron.png",
      alt: "Iron Badge",
      name: "Iron",
    };
  }
};

const ProgressDisplay = ({
  percentile,
  isLifetime,
}: {
  percentile: number;
  isLifetime: boolean;
}) => {
  const badgeData = getBadgeData(percentile);

  const reversedPercentile = Math.round(100 - percentile);
  const displayNumber =
    reversedPercentile === 0
      ? 1
      : reversedPercentile === 100
        ? 99
        : reversedPercentile;

  return (
    <div className="flex flex-col gap-2">
      <Progress value={percentile} variant={badgeData.variant} />
      <p className="text-sm text-muted-foreground">
        Top {displayNumber}% of users{" "}
        {isLifetime ? "all time" : "in last 30 days"}
      </p>
    </div>
  );
};

const ProgressDisplaySkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
};

export const Leaderboard = () => {
  const {
    data: userPercentiles,
    isLoading,
    error,
  } = trpc.user.getUserPercentiles.useQuery(undefined, {
    retry: false,
  });

  const badgeData = getBadgeData(userPercentiles?.last30DaysPercentile ?? 40);

  return (
    <Card className="flex w-full flex-col justify-center transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leaderboard</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Keep up the good progress!
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2 w-full">
        <div className="flex items-center gap-6">
          <div className="flex w-full flex-col gap-5">
            <div className="w-full">
              {isLoading ? (
                <ProgressDisplaySkeleton />
              ) : (
                <ProgressDisplay
                  percentile={userPercentiles?.last30DaysPercentile ?? 0}
                  isLifetime={false}
                />
              )}
            </div>
            <div className="w-full">
              {isLoading ? (
                <ProgressDisplaySkeleton />
              ) : (
                <ProgressDisplay
                  percentile={userPercentiles?.lifetimePercentile ?? 0}
                  isLifetime={true}
                />
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            {isLoading ? (
              <Skeleton className="h-20 w-20 rounded-lg sm:h-24 sm:w-24 md:h-28 md:w-28" />
            ) : (
              <Image
                src={badgeData.src}
                alt={badgeData.alt}
                width={100}
                height={100}
                className="mb-3 h-20 w-20 object-contain sm:h-24 sm:w-24 md:h-28 md:w-28"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
