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
import { trpc } from "@/lib/util/trpc";
import Image from "next/image";

const ProgressDisplay = ({
  percentile,
  isLifetime,
}: {
  percentile: number;
  isLifetime: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Progress value={percentile} />
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

  return (
    <Card className="w-full cursor-pointer transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leaderboard</CardTitle>
        <CardDescription className="text-base text-foreground" hidden>
          View the leaderboard and create a new challenge.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2 w-full">
        <div className="flex">
          <div className="flex w-full flex-col gap-5">
            <div className="w-full">
              <ProgressDisplay
                percentile={userPercentiles?.lifetimePercentile ?? 0}
                isLifetime={true}
              />
            </div>
            <div className="w-full">
              <ProgressDisplay
                percentile={userPercentiles?.last30DaysPercentile ?? 0}
                isLifetime={false}
              />
            </div>
          </div>
          <div className="bg-blue-500">
            <Image
              src="/badges/bronze.svg"
              alt="Bronze Badge"
              width={100}
              height={100}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
