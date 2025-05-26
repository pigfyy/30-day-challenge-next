import { useState, useCallback } from "react";
import { trpc } from "@/lib/util/trpc";
import { handleDailyProgressImageUpload } from "@/lib/actions";
import {
  ChallengeWithDailyProgress,
  DailyProgress,
  DailyTaskOptional,
} from "@/lib/db/drizzle/zod";

export const useDailyProgressForm = (
  challenge: ChallengeWithDailyProgress,
  date: Date | undefined,
  day: DailyProgress | undefined,
  onClose: () => void,
) => {
  const utils = trpc.useUtils();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState("");
  const [dailyTasks, setDailyTasks] = useState<DailyTaskOptional[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);

  const { data: dailyTasksData } = trpc.dailyTask.getDailyTasks.useQuery({
    challengeId: challenge.id,
  });

  const {
    mutateAsync: upsertDailyTasks,
    isPending: isPendingUpsertDailyTasks,
  } = trpc.dailyTask.upsertDailyTasks.useMutation({
    onSettled: () => {
      utils.dailyTask.invalidate();
    },
  });

  const { mutateAsync: upsertDailyProgress, isPending: isPendingSubmit } =
    trpc.dailyProgress.upsertDailyProgress.useMutation({
      onSettled: () => {
        utils.dailyProgress.invalidate();
        utils.challenge.getChallengesWithDailyProgress.invalidate();
      },
    });

  const { mutateAsync: deleteDailyProgressImage, isPending: isPendingDelete } =
    trpc.dailyProgress.deleteDailyProgressImage.useMutation();

  const initializeForm = useCallback(() => {
    setSelectedFile(day?.imageUrl || null);
    setNote(day?.note || "");
    setDailyTasks(
      dailyTasksData?.filter((task) => task.dailyProgressId === day?.id) || [],
    );
  }, [day?.imageUrl, day?.note, day?.id, dailyTasksData]);

  const submitForm = async () => {
    if (!date) {
      return onClose();
    }

    setIsSubmitting(true);

    try {
      // Check and handle image changes
      const hasImageChanges =
        !(typeof selectedFile === "string") &&
        (selectedFile !== null || (day && day.imageUrl));

      let imageUrl = day?.imageUrl || "";
      let oldImageUrlToDelete: string | null = null;

      if (hasImageChanges) {
        if (selectedFile && typeof selectedFile !== "string") {
          const newImageUrl =
            await handleDailyProgressImageUpload(selectedFile);

          if (day?.imageUrl) {
            oldImageUrlToDelete = day.imageUrl;
          }

          imageUrl = newImageUrl;
        } else if (day && day.imageUrl) {
          await deleteDailyProgressImage(day.imageUrl);
          imageUrl = "";
        }
      }

      // Check and handle notes changes
      const hasNoteChanges = note !== (day?.note || "");

      // Check and handle daily progress changes (image or notes)
      if (hasImageChanges || hasNoteChanges) {
        const updateData = {
          id: day?.id,
          date: date,
          challengeId: challenge.id,
          completed: false,
          ...(day || {}),
          imageUrl: imageUrl,
          note: note,
        };

        await upsertDailyProgress({
          newDailyProgress: updateData,
          existingRecord: day,
        });

        if (oldImageUrlToDelete) {
          await deleteDailyProgressImage(oldImageUrlToDelete);
        }
      }

      const hasDailyTasksChanges = (() => {
        const originalTasks =
          dailyTasksData?.filter((task) => task.dailyProgressId === day?.id) ||
          [];

        if (dailyTasks.length !== originalTasks.length) {
          return true;
        }

        const sortedDailyTasks = [...dailyTasks].sort(
          (a, b) => a.order - b.order,
        );
        const sortedOriginalTasks = [...originalTasks].sort(
          (a, b) => a.order - b.order,
        );

        return sortedDailyTasks.some((task, index) => {
          const originalTask = sortedOriginalTasks[index];
          if (!originalTask) return true;

          return (
            task.id !== originalTask.id ||
            task.title !== originalTask.title ||
            task.completed !== originalTask.completed ||
            task.order !== originalTask.order
          );
        });
      })();

      if (hasDailyTasksChanges && day?.id) {
        const tasksToUpsert = dailyTasks.map((task) => ({
          ...task,
          dailyProgressId: day.id,
          createdAt: task.createdAt || new Date(),
        }));

        await upsertDailyTasks(tasksToUpsert);
      }

      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading =
    isSubmitting ||
    isPendingSubmit ||
    isPendingDelete ||
    isPendingUpsertDailyTasks;

  return {
    note,
    setNote,
    dailyTasks,
    setDailyTasks,
    selectedFile,
    setSelectedFile,
    initializeForm,
    submitForm,
    isLoading,
  };
};
