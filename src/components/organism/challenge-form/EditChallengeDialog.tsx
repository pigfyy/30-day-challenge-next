import { EditChallenge } from "@/components/molecule/challenge-form/EditChallenge";
import { DialogComponent } from "@/components/molecule/DialogComponent";
import { Challenge } from "@/lib/db/types";

export const EditChallengeDialog = ({
  challenge,
  isEditChallengeDialogOpen,
  setIsEditChallengeDialogOpen,
}: {
  challenge: Challenge;
  isEditChallengeDialogOpen: boolean;
  setIsEditChallengeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <DialogComponent
      isDialogOpen={isEditChallengeDialogOpen}
      setIsDialogOpen={setIsEditChallengeDialogOpen}
      title="Edit Challenge"
      description="Update the details of this challenge. Click save when you're done."
    >
      <EditChallenge
        challenge={challenge}
        setIsDialogOpen={setIsEditChallengeDialogOpen}
      />
    </DialogComponent>
  );
};
