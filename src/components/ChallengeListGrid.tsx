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
import { toast } from "@/hooks/use-toast";
import { trpc } from "@/lib/util/trpc";
import { Pencil, PlusCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EditChallengeDialog } from "./organism/challenge-form/EditChallengeDialog";
import { Challenge } from "@prisma/client";

export const ChallengeListGrid = () => {
  const { data: challenges } = trpc.challenge.getChallenges.useQuery();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditChallengeDialogOpen, setIsEditChallengeDialogOpen] =
    useState(false);
  const [editChallenge, setEditChallenge] = useState<Challenge | undefined>(
    undefined,
  );

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const challengeId = searchParams.get("challenge");
    if (challengeId && isMounted) {
      const params = new URLSearchParams(searchParams);
      params.delete("challenge");
      replace(`${pathname}?${params.toString()}`);

      toast({
        variant: "destructive",
        title: "Challenge not found!",
        duration: 1000,
      });
    }
  }, [searchParams, replace, pathname, isMounted]);

  const handleViewClick = (challengeId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("challenge", challengeId);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleEditClick = (challenge: Challenge) => {
    setEditChallenge(challenge);
    setIsEditChallengeDialogOpen(true);
  };

  const handleCreateChallengeClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("challenge", "new");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section className="flex w-11/12 flex-col gap-6 md:w-2/3">
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
            <Card
              key={challenge.id}
              className="transition-shadow duration-200 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                  {challenge.icon}
                </div>
                <CardTitle className="text-lg font-semibold">
                  {challenge.title}
                </CardTitle>
                <CardDescription className="text-base text-foreground">
                  {challenge.wish}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <p className="text-base text-muted-foreground">
                  {challenge.dailyAction}
                </p>
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
    </>
  );
};
