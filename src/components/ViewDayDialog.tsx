import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { handleDailyProgressImageUpload } from "@/lib/actions";
import { trpc } from "@/lib/util/trpc";
import {
  Challenge,
  ChallengeWithDailyProgress,
  DailyTask,
} from "@/lib/db/drizzle/zod";
import { isSameDay } from "date-fns";
import { ChevronDown, X, Plus, Check } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import cuid from "cuid";

type DailyTaskOptional = Partial<DailyTask> & {
  id: string;
  title: string;
  completed: boolean;
  order: number;
};

const DailyTasksList = ({
  tasks,
  onTasksChange,
}: {
  tasks: DailyTaskOptional[];
  onTasksChange: (tasks: DailyTaskOptional[]) => void;
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: DailyTaskOptional = {
        id: cuid(),
        title: newTaskTitle.trim(),
        completed: false,
        order: tasks.length,
      };
      onTasksChange([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    onTasksChange(updatedTasks);
  };

  const removeTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      order: index,
    }));
    onTasksChange(reorderedTasks);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="group flex items-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
            className="flex-shrink-0"
          />
          <span
            className={`flex-1 ${
              task.completed
                ? "text-gray-500 line-through"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {task.title}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => removeTask(task.id)}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div
        className={`flex items-center gap-3 ${
          tasks.length > 0
            ? "border-t border-gray-200 dark:border-gray-700"
            : ""
        }`}
      >
        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
          <Plus className="h-3 w-3 text-gray-400" />
        </div>
        <Input
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border-none px-0 shadow-none focus-visible:ring-0"
        />
        {newTaskTitle.trim() && (
          <Button size="sm" onClick={addTask} variant="ghost">
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

const UploadButton = ({
  setSelectedFile,
}: {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string | null>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <Button onClick={handleButtonClick} variant="outline">
        Upload File
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

function useImagePreview() {
  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      setDimensions(null);
      return;
    }

    if (typeof selectedFile === "string") {
      setPreviewUrl(selectedFile);

      const ImageConstructor = window.Image as { new (): HTMLImageElement };
      const img = new ImageConstructor();
      img.onload = () => {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = selectedFile;

      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    const ImageConstructor = window.Image as { new (): HTMLImageElement };
    const img = new ImageConstructor();
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.src = objectUrl;

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  return { selectedFile, setSelectedFile, previewUrl, dimensions };
}

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
  const utils = trpc.useUtils();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDailyTasksCollapsibleOpen, setIsDailyTasksCollapsibleOpen] =
    useState(true);
  const [isImageCollapsibleOpen, setIsImageCollapsibleOpen] = useState(true);
  const [isNotesCollapsibleOpen, setIsNotesCollapsibleOpen] = useState(true);
  const [note, setNote] = useState("");
  const [dailyTasks, setDailyTasks] = useState<DailyTaskOptional[]>([]);

  const { selectedFile, setSelectedFile, previewUrl, dimensions } =
    useImagePreview();

  const { data: dailyTasksData, isLoading: isDailyTasksLoading } =
    trpc.dailyTask.getDailyTasks.useQuery({
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

  const day = date
    ? challenge.dailyProgress.find((dp) => isSameDay(dp.date, date))
    : undefined;

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(day?.imageUrl || null);
      setNote(day?.note || "");
      setDailyTasks(
        dailyTasksData?.filter((task) => task.dailyProgressId === day?.id) ||
          [],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day?.id]);

  function getChallengeDay(challenge: ChallengeWithDailyProgress, date: Date) {
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);
    const targetDate = new Date(date);

    const startOfDayStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );
    const startOfDayEndDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
    );
    const startOfDayTargetDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
    );

    if (
      startOfDayTargetDate < startOfDayStartDate ||
      startOfDayTargetDate > startOfDayEndDate
    ) {
      return null;
    }

    const diffInMs =
      startOfDayTargetDate.getTime() - startOfDayStartDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

    return diffInDays;
  }

  async function submitDailyProgressUpdate() {
    if (!date) {
      return setIsOpen(false);
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

      // Check and handle daily tasks changes
      const hasDailyTasksChanges = dailyTasks.length > 0;

      if (hasDailyTasksChanges && day?.id) {
        const tasksToUpsert = dailyTasks.map((task) => ({
          ...task,
          dailyProgressId: day.id,
          createdAt: task.createdAt || new Date(),
        }));

        await upsertDailyTasks(tasksToUpsert);
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <Collapsible
            defaultOpen={true}
            open={isDailyTasksCollapsibleOpen}
            onOpenChange={setIsDailyTasksCollapsibleOpen}
          >
            <div className="flex items-center gap-8">
              <span className="text-md font-bold">Daily Tasks</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isDailyTasksCollapsibleOpen ? "rotate-180" : ""}`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator
              className={`mt-1 ${dailyTasks.length === 0 ? "mb-2" : "mb-3"}`}
            />
            <CollapsibleContent>
              <DailyTasksList
                tasks={dailyTasks}
                onTasksChange={setDailyTasks}
              />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            defaultOpen={true}
            open={isNotesCollapsibleOpen}
            onOpenChange={setIsNotesCollapsibleOpen}
          >
            <div className="flex items-center gap-8">
              <span className="text-md font-bold">Notes</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isNotesCollapsibleOpen ? "rotate-180" : ""}`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator className="mb-5 mt-1" />
            <CollapsibleContent>
              <Textarea
                placeholder="Add your notes for this day..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px]"
              />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            defaultOpen={true}
            open={isImageCollapsibleOpen}
            onOpenChange={setIsImageCollapsibleOpen}
          >
            <div className="flex items-center gap-8">
              <span className="text-md font-bold">Upload an image</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isImageCollapsibleOpen ? "rotate-180" : ""}`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator className="mb-5 mt-1" />
            <CollapsibleContent>
              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <UploadButton setSelectedFile={setSelectedFile} />
                  {selectedFile ? (
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X />
                    </Button>
                  ) : null}
                </div>
                <div className="mt-4">
                  {selectedFile && previewUrl && dimensions ? (
                    <Image
                      src={previewUrl}
                      alt={
                        typeof selectedFile === "string"
                          ? "Uploaded image"
                          : selectedFile.name || "Uploaded image"
                      }
                      layout="responsive"
                      width={dimensions.width}
                      height={dimensions.height}
                      objectFit="contain"
                    />
                  ) : null}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button
            onClick={submitDailyProgressUpdate}
            className="mr-auto"
            disabled={
              isSubmitting ||
              isPendingSubmit ||
              isPendingDelete ||
              isPendingUpsertDailyTasks
            }
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
