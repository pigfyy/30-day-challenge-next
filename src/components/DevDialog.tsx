"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  changeDates,
  deleteDailyProgressAction,
  deleteCurrentUserAction,
} from "@/lib/actions";
import { trpc } from "@/lib/util/trpc";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React from "react";
import { authClient } from "@/lib/auth-client";

const Content: React.FC<{
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ setIsModalOpen }) => {
  const utils = trpc.useUtils();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challenge");
  const router = useRouter();

  const { data: challenges } = trpc.challenge.getChallenges.useQuery();

  // State for the date inputs
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false);

  const challenge = challenges?.find((c) => c.id === challengeId);

  const handleDeleteUserAndSignOut = async () => {
    setIsDeletingUser(true);
    try {
      const result = await deleteCurrentUserAction();
      if (result.success) {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        });
      } else {
        console.error("Failed to delete user:", result.error);
      }
    } catch (error) {
      console.error("Error in delete user and sign out process:", error);
    } finally {
      setIsDeletingUser(false);
    }
  };

  // Set initial values for the date inputs when the challenge is loaded
  React.useEffect(() => {
    if (challenge) {
      setStartDate(challenge.startDate.toISOString().split("T")[0]);
      setEndDate(challenge.endDate.toISOString().split("T")[0]);
    }
  }, [challenge]);

  const handleSubmit = async () => {
    if (!challenge) return; // Should not happen if button is only visible with challenge
    setIsSubmitting(true);
    try {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      const startDateObj = new Date(`${startDate}T00:00:00`);
      const endDateObj = new Date(`${endDate}T00:00:00`);

      startDateObj.setHours(currentHours, currentMinutes, currentSeconds);
      endDateObj.setHours(currentHours, currentMinutes, currentSeconds);

      await changeDates(challenge, startDateObj, endDateObj);
      await utils.challenge.getChallenges.invalidate();
      await utils.challenge.getChallengesWithDailyProgress.invalidate();
      await utils.dailyProgress.getDailyProgress.invalidate();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update dates:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAnyActionInProgress = isSubmitting || isDeletingUser;
  const isSubmitDatesDisabled =
    !startDate || !endDate || isAnyActionInProgress || !challenge;

  return (
    <div className="flex flex-col space-y-4">
      {challenge && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={isAnyActionInProgress}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isAnyActionInProgress}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitDatesDisabled}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Dates"}
            </Button>
          </div>
        </>
      )}
      <div className="flex flex-col space-y-2">
        <Button
          onClick={handleDeleteUserAndSignOut}
          disabled={isAnyActionInProgress}
          variant="destructive"
          className="w-full"
        >
          {isDeletingUser ? "Deleting User..." : "Delete User and Sign Out"}
        </Button>
        <Button
          onClick={() => setIsModalOpen(false)}
          disabled={isAnyActionInProgress}
          className="w-full"
          variant="outline"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export function DevDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keysPressed, setKeysPressed] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newKeysPressed = new Set(keysPressed);
      newKeysPressed.add(event.key.toLowerCase());

      if (
        newKeysPressed.has("q") &&
        newKeysPressed.has("e") &&
        newKeysPressed.has("t")
      ) {
        setIsModalOpen(true);
      }

      setKeysPressed(newKeysPressed);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const newKeysPressed = new Set(keysPressed);
      newKeysPressed.delete(event.key.toLowerCase());
      setKeysPressed(newKeysPressed);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ADMIN</DialogTitle>
        </DialogHeader>
        <Content setIsModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
}
