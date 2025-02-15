import { trpc } from "@/lib/util/trpc";
import { Challenge } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import {
  ChallengeForm,
  challengeFormSchema,
} from "@/components/molecules/challenge-form/ChallengeForm";

export const EditChallenge = ({
  challenge,
  setIsDialogOpen,
}: {
  challenge: Challenge;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
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

        const params = new URLSearchParams(searchParams);
        params.delete("challenge");
        replace(`${pathname}?${params.toString()}`);
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

  const defaultValues = {
    title: challenge.title,
    wish: challenge.wish,
    dailyAction: challenge.dailyAction,
    icon: challenge.icon,
  };

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
