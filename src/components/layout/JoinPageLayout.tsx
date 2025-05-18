"use client";

import { trpc } from "@/lib/util/trpc";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";

export default function JoinPageLayout({
  challengeId,
}: {
  challengeId: string;
}) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: challengeIdea, isLoading: isChallengeIdeaLoading } =
    trpc.challengeIdea.getChallengeIdea.useQuery(challengeId);

  const { mutate: createChallenge } =
    trpc.challenge.createChallenge.useMutation({
      onSuccess: async (challenge) => {
        await utils.challenge.getChallenges.invalidate();

        router.push(`/app?challenge=${challenge.id}`);
      },
    });

  if (isChallengeIdeaLoading) {
    return (
      <div className="my-6 flex flex-1 items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!challengeIdea) {
    return (
      <div className="my-6 flex flex-1 items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Challenge Not Found</CardTitle>
            <CardDescription>
              The challenge you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="/app">Return to Dashboard</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleJoinChallenge = () => {
    createChallenge({
      title: challengeIdea.title,
      wish: challengeIdea.wish,
      dailyAction: challengeIdea.dailyAction,
      startDate: new Date(),
      endDate: addDays(new Date(), 29),
      challengeIdeaId: challengeId,
    });
  };

  return (
    <div className="my-6 flex flex-1 items-center justify-center p-2 sm:px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="px-4 sm:px-6">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Welcome! Here&apos;s the challenge you&apos;ve requested to join!
          </h1>
        </CardHeader>
        <CardContent className="space-y-6 px-3 sm:px-6">
          <Card className="w-full transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-xl text-gray-800">
                {challengeIdea.title}
              </CardTitle>
              <CardDescription>{challengeIdea.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-4 sm:px-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Wish: </span>
                {challengeIdea.wish}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Daily Action: </span>
                {challengeIdea.dailyAction}
              </p>
              {challengeIdea.sourceLink && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Source: </span>
                  <a
                    href={challengeIdea.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {challengeIdea.sourceName || challengeIdea.sourceLink}
                  </a>
                </p>
              )}
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 px-3 sm:flex-row sm:justify-center sm:px-6">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleJoinChallenge}
          >
            Join Challenge
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            asChild
          >
            <a href="/app">Return to Dashboard</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
