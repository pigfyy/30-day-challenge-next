"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePwa } from "@/hooks/use-pwa";
import { toast } from "@/hooks/use-toast";
import { useUrlState } from "@/hooks/use-url-state";
import {
  calculateCompletionRate,
  calculateElapsedTime,
} from "@/lib/util/dates";
import { trpc } from "@/lib/util/trpc";
import { Challenge, DailyProgress } from "@prisma/client";
import { Pencil, PlusCircle, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { EditChallengeDialog } from "./organism/challenge-form/EditChallengeDialog";
import { PwaInstallDialog } from "./PwaInstallDialog";
import {
  GOOD_PROGRESS_THRESHOLD,
  EXCELLENT_PROGRESS_THRESHOLD,
} from "@/lib/constants";

const ProgressBar = ({
  elapsedTime,
  completionRate,
}: {
  elapsedTime: number;
  completionRate: number;
}) => {
  return (
    <div className="relative w-full space-y-3">
      <div className="mb-1 flex justify-between text-xs font-semibold">
        <span className="text-gray-600">
          🕒 Time Elapsed:{" "}
          {(elapsedTime * 100).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          %
        </span>
        <span className="text-green-600">
          ✅ Completion:{" "}
          {(completionRate * 100).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          %
        </span>
      </div>
      <div className="relative h-3 w-full rounded-md bg-gray-300">
        <div
          className={`absolute left-0 top-0 h-3 bg-gray-500 ${
            elapsedTime === 1 ? "rounded-full" : "rounded-l-full"
          }`}
          style={{ width: `${elapsedTime * 100}%` }}
        ></div>
        <div
          className="absolute left-0 top-1/2 h-4 -translate-y-1/2 rounded-full bg-green-500"
          style={{ width: `${completionRate * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const ChallengeCard = ({
  challenge,
  setEditChallenge,
  setIsEditChallengeDialogOpen,
}: {
  challenge: Challenge & { dailyProgress: DailyProgress[] };
  setEditChallenge: React.Dispatch<React.SetStateAction<Challenge | undefined>>;
  setIsEditChallengeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setQueryParam } = useUrlState();

  const elapsedTime = calculateElapsedTime(challenge);
  const completionRate = calculateCompletionRate(challenge);
  const shadowColor =
    completionRate >= EXCELLENT_PROGRESS_THRESHOLD
      ? "hover:shadow-green-500/20"
      : completionRate >= GOOD_PROGRESS_THRESHOLD
        ? "hover:shadow-orange-500/20"
        : "hover:shadow-red-500/20";

  const handleViewClick = (challengeId: string) => {
    setQueryParam("challenge", challengeId);
  };

  const handleEditClick = (challenge: Challenge) => {
    setEditChallenge(challenge);
    setIsEditChallengeDialogOpen(true);
  };

  return (
    <Card
      key={challenge.id}
      className={`transition-shadow duration-200 hover:shadow-lg ${shadowColor}`}
    >
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
          {challenge.icon}
        </div>
        <CardTitle className="text-lg font-semibold">
          {challenge.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-7 space-y-2">
          <p className="text-base text-foreground">
            <span className="font-semibold">Wish:</span> {challenge.wish}
          </p>
          <p className="text-base">
            <span className="font-semibold text-black">Daily Action:</span>{" "}
            {challenge.dailyAction}
          </p>
        </div>
        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>{new Date(challenge.startDate).toLocaleDateString()}</span>
            <span>{new Date(challenge.endDate).toLocaleDateString()}</span>
          </div>
          <ProgressBar
            elapsedTime={elapsedTime}
            completionRate={completionRate}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleViewClick(challenge.id)}
        >
          View Challenge
        </Button>
        <Button
          variant="outline"
          size={"icon"}
          className="aspect-square"
          onClick={() => handleEditClick(challenge)}
        >
          <Pencil />
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ChallengeList = () => {
  const { data: challenges } = trpc.challenge.getChallenges.useQuery({
    includeDailyProgressData: true,
  });
  const { searchParams, removeQueryParam, getQueryParam, updateQueryParam } =
    useUrlState();

  const [isMounted, setIsMounted] = useState(false);
  const [isEditChallengeDialogOpen, setIsEditChallengeDialogOpen] =
    useState(false);
  const [editChallenge, setEditChallenge] = useState<Challenge | undefined>(
    undefined,
  );
  const [isPwaDialogOpen, setIsPwaDialogOpen] = useState(false);
  const { isPwa, isClient } = usePwa();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const challengeId = getQueryParam("challenge");
    if (challengeId && isMounted) {
      removeQueryParam("challenge");

      toast({
        variant: "destructive",
        title: "Challenge not found!",
        duration: 1000,
      });
    }
  }, [searchParams, removeQueryParam, getQueryParam, isMounted]);

  const handleCreateChallengeClick = () => {
    updateQueryParam("challenge", "new");
  };

  return (
    <>
      <section className="flex w-11/12 flex-col gap-6 md:w-2/3">
        <div className="flex items-center justify-between">
          <h1
            className="text-3xl font-bold"
            onClick={() => {
              toast({
                title: "Welcome back!",
                description:
                  "You can now start your journey towards a healthier life.",
              });
            }}
          >
            Welcome back!
          </h1>
          {isClient && isMobile && !isPwa && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setIsPwaDialogOpen(true)}
            >
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Install App</span>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            className="cursor-pointer transition-shadow duration-200 hover:shadow-lg"
            onClick={handleCreateChallengeClick}
          >
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                <PlusCircle />
              </div>
              <CardTitle className="text-lg font-semibold">
                Create New Challenge
              </CardTitle>
              <CardDescription className="text-base text-foreground">
                Start a new personalized challenge.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <p className="text-base text-muted-foreground">
                Define your goals and track your progress.
              </p>
            </CardContent>
            <CardFooter className="mt-4">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {challenges?.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              setEditChallenge={setEditChallenge}
              setIsEditChallengeDialogOpen={setIsEditChallengeDialogOpen}
            />
          ))}
        </div>
      </section>
      <>
        {editChallenge ? (
          <EditChallengeDialog
            challenge={editChallenge}
            isEditChallengeDialogOpen={isEditChallengeDialogOpen}
            setIsEditChallengeDialogOpen={setIsEditChallengeDialogOpen}
          />
        ) : null}
      </>
      <PwaInstallDialog
        open={isPwaDialogOpen}
        onOpenChange={setIsPwaDialogOpen}
      />
    </>
  );
};
