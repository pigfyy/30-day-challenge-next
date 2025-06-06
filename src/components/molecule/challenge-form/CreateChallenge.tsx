"use client";

import { BackButton } from "@/components/BackButton";
import {
  ChallengeForm,
  challengeFormSchema,
} from "@/components/molecule/challenge-form/ChallengeForm";
import { ChallengeSearchCard } from "@/components/molecule/challenge-form/SearchChallenge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUrlState } from "@/hooks/use-url-state";
import { trpc } from "@/lib/util/trpc";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

export function CreateChallenge() {
  const utils = trpc.useUtils();
  const { data: challenges } = trpc.challenge.getChallenges.useQuery();
  const { updateQueryParam } = useUrlState();

  const [defaultValues, setDefaultValues] = useState<
    z.infer<typeof challengeFormSchema> | undefined
  >(undefined);

  const { mutate, isPending } = trpc.challenge.createChallenge.useMutation({
    onSuccess: async (challenge) => {
      await utils.challenge.getChallenges.invalidate();
      await utils.challenge.getChallengesWithDailyProgress.invalidate();
      updateQueryParam("challenge", challenge.id);
    },
  });

  const [leftCardHeight, setLeftCardHeight] = useState<number>(0);
  const leftCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = leftCardRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === el) {
          const rect = el.getBoundingClientRect();
          setLeftCardHeight(rect.height);
        }
      }
    });

    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof challengeFormSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex w-full flex-col-reverse gap-6 md:flex-row md:flex-wrap md:justify-center">
      <div className="w-full md:w-1/3">
        <Card className="w-full" ref={leftCardRef}>
          <CardHeader>
            {challenges?.length ? (
              <div className="mb-6">
                <BackButton />
              </div>
            ) : null}
            <CardTitle className="text-xl font-bold">
              Create Challenge
            </CardTitle>
            <CardDescription>
              Set up your new challenge details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChallengeForm
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
            />
          </CardContent>
        </Card>
      </div>

      <ChallengeSearchCard
        leftCardHeight={leftCardHeight}
        setDefaultValues={setDefaultValues}
      />
    </div>
  );
}
