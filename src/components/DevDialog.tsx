"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { changeDates, deleteDailyProgressAction } from "@/lib/actions";
import { trpc } from "@/lib/util/trpc";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React from "react";

const Content: React.FC<{
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ setIsModalOpen }) => {
  const utils = trpc.useUtils();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challenge");

  const { data: challenges } = trpc.challenge.getChallenges.useQuery();

  // State for the date inputs
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const challenge = challenges?.find((c) => c.id === challengeId);

  // Set initial values for the date inputs when the challenge is loaded
  React.useEffect(() => {
    if (challenge) {
      setStartDate(challenge.startDate.toISOString().split("T")[0]);
      setEndDate(challenge.endDate.toISOString().split("T")[0]);
    }
  }, [challenge]);

  if (!challenge) {
    return null;
  }

  const handleSubmit = async () => {
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
      await utils.dailyProgress.getDailyProgress.invalidate();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update dates:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable the submit button if the dates are invalid or the form is submitting
  const isSubmitDisabled = !startDate || !endDate || isSubmitting;

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="w-1/2"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button
          onClick={() => setIsModalOpen(false)}
          disabled={isSubmitting}
          className="w-1/2"
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
