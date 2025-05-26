import { ChallengeWithDailyProgress } from "@/lib/db/drizzle/zod";
import { isSameDay } from "date-fns";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DailyTasksSection } from "../molecule/view-day-dialog/DailyTasksSection";
import { NotesSection } from "../molecule/view-day-dialog/NotesSection";
import { ImageUploadSection } from "../molecule/view-day-dialog/ImageUploadSection";
import { useDailyProgressForm } from "@/hooks/use-daily-progress-form";
import { getChallengeDay } from "@/lib/util/dates";

export const ViewDayDialog = ({
  isOpen,
  setIsOpen,
  challenge,
  date,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  challenge: ChallengeWithDailyProgress;
  date: Date | undefined;
}) => {
  const day = date
    ? challenge.dailyProgress.find((dp) => isSameDay(dp.date, date))
    : undefined;

  const {
    note,
    setNote,
    dailyTasks,
    setDailyTasks,
    selectedFile,
    setSelectedFile,
    initializeForm,
    submitForm,
    isLoading,
  } = useDailyProgressForm(challenge, date, day, () => setIsOpen(false));

  useEffect(() => {
    if (isOpen) {
      initializeForm();
    }
  }, [isOpen, day?.id, initializeForm]);

  if (!date) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto lg:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>
            Day {getChallengeDay(challenge, date)} ---{" "}
            {date.toLocaleDateString()}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription hidden>
          Record a progress image or notes for the day!
        </DialogDescription>
        <div className="flex flex-col gap-7">
          <DailyTasksSection tasks={dailyTasks} onTasksChange={setDailyTasks} />

          <NotesSection note={note} onNoteChange={setNote} />

          <ImageUploadSection
            selectedFile={selectedFile}
            onFileChange={setSelectedFile}
          />

          <Button onClick={submitForm} className="mr-auto" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
