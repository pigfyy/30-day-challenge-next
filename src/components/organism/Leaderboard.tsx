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

  return (
    <div className="flex flex-col gap-2">
      <Progress value={percentile} variant={badgeData.variant} />
      <p className="text-sm text-muted-foreground">
        Top {percentile}% of users {isLifetime ? "all time" : "in last 30 days"}
      </p>
    </div>
  );
};

export const Leaderboard = () => {
  const { data: userPercentiles, isLoading } =
    trpc.user.getUserPercentiles.useQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const badgeData = getBadgeData(userPercentiles?.last30DaysPercentile ?? 100);

  return (
    <Card className="flex w-full flex-col justify-center transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leaderboard</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Keep up the good progress!
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2 w-full">
        <div className="flex items-start gap-6">
          <div className="flex w-full flex-col gap-5">
            <div className="w-full">
              <ProgressDisplay
                percentile={userPercentiles?.last30DaysPercentile ?? 0}
                isLifetime={false}
              />
            </div>
            <div className="w-full">
              <ProgressDisplay
                percentile={userPercentiles?.lifetimePercentile ?? 0}
                isLifetime={true}
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={badgeData.src}
              alt={badgeData.alt}
              width={100}
              height={100}
              className="h-20 w-20 object-contain sm:h-24 sm:w-24 md:h-28 md:w-28"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
