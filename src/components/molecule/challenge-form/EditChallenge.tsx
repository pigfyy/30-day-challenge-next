"use client";

import { trpc } from "@/lib/util/trpc";
import { Challenge } from "@prisma/client";
import { useUrlState } from "@/hooks/use-url-state";
import { z } from "zod";
import {
  ChallengeForm,
  challengeFormSchema,
} from "@/components/molecule/challenge-form/ChallengeForm";
import { useMemo } from "react";

export const EditChallenge = ({
  challenge,
  setIsDialogOpen,
}: {
  challenge: Challenge;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { removeQueryParam } = useUrlState();
  const utils = trpc.useUtils();

  const { mutate: updateChallenge, isPending: isUpdatePending } =
    trpc.challenge.updateChallenge.useMutation({
      onSettled: async () => {
        await utils.challenge.getChallenges.invalidate();
        setIsDialogOpen(false);
      },
    });
  const { mutate: deleteChallenge, isPending: isDeletePending } =
    trpc.challenge.deleteChallenge.useMutation({
      onSettled: async () => {
        await utils.challenge.getChallenges.invalidate();
        setIsDialogOpen(false);
        removeQueryParam("challenge");
      },
    });

  const handleSubmit = async (values: z.infer<typeof challengeFormSchema>) => {
    updateChallenge({
      ...challenge,
      ...values,
    });
  };

  const handleDelete = () => {
    deleteChallenge(challenge.id);
  };

  const defaultValues = useMemo(() => {
    return {
      title: challenge.title,
      wish: challenge.wish,
      dailyAction: challenge.dailyAction,
      icon: challenge.icon,
    };
  }, [challenge]);

  return (
    <ChallengeForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      disabled={isUpdatePending || isDeletePending}
      isDeleting={isDeletePending}
    />
  );
};
