"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { handleChallengeUpdate } from "@/lib/actions/updateChallenge";
import { Challenge, DailyProgress } from "@prisma/client";
import { ImageIcon, Notebook, Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { EditChallenge } from "./ChallengeForms";

export const ViewChallengeHeader = ({
  challenge,
  dailyProgress,
}: {
  challenge: Challenge;
  dailyProgress: DailyProgress[];
}) => {
  const [isImagesSheetOpen, setIsImagesSheetOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isEditChallengeDialogOpen, setIsEditChallengeDialogOpen] =
    useState(false);

  return (
    <>
      <section className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            {challenge.title}
          </h1>
          <h2 className="mb-1 text-xl text-gray-600">{challenge.wish}</h2>
          <h2 className="text-xl text-gray-600">{challenge.dailyAction}</h2>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditChallengeDialogOpen(true)}
          >
            <Pencil /> Edit Challenge
          </Button>
          <Button variant="outline" onClick={() => setIsNoteDialogOpen(true)}>
            <Notebook /> Add Note
          </Button>
          <Button variant="outline" onClick={() => setIsImagesSheetOpen(true)}>
            <ImageIcon /> View Images
          </Button>
        </div>
      </section>
      <>
        <SheetComponent
          isOpen={isImagesSheetOpen}
          setIsOpen={setIsImagesSheetOpen}
        >
          <ProgressImageDisplay dailyProgress={dailyProgress} />
        </SheetComponent>
        <DialogComponent
          isDialogOpen={isNoteDialogOpen}
          setIsDialogOpen={setIsNoteDialogOpen}
          title="Add a Note"
          description="Write a note for this challenge. Click save when you're done."
        >
          <EditNoteForm
            challenge={challenge}
            setIsDialogOpen={setIsNoteDialogOpen}
          />
        </DialogComponent>
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
      </>
    </>
  );
};

const ProgressImageDisplay = ({
  dailyProgress,
}: {
  dailyProgress: DailyProgress[];
}) => {
  return (
    <div className="flex flex-col gap-3">
      {dailyProgress.map((dp) => {
        if (!dp.imageUrl) return null;

        return (
          <div key={dp.id} className="flex w-full flex-col gap-2">
            <div className="font-semibold">{dp.date.toLocaleDateString()}</div>
            <div className="relative h-48 w-full">
              <Image
                src={dp.imageUrl}
                alt="Progress image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SheetComponent = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-[480px]">
        <SheetHeader>
          <SheetTitle>View your challenge progress images here!</SheetTitle>
        </SheetHeader>
        <div className="mt-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

const DialogComponent = ({
  isDialogOpen,
  setIsDialogOpen,
  title,
  description,
  children,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const EditNoteForm = ({
  challenge,
  setIsDialogOpen,
}: {
  challenge: Challenge;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        textareaRef.current.value.length;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const note = textareaRef.current?.value || "";

    startTransition(() => {
      handleChallengeUpdate({
        ...challenge,
        note,
      });

      setIsDialogOpen(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <Textarea
          ref={textareaRef} // Attach the ref
          name="note"
          placeholder="Type your note here..."
          className="min-h-[100px]"
          defaultValue={challenge.note || ""}
        />
      </div>
      <Button className="w-full" type="submit" disabled={isPending}>
        Save Note
      </Button>
    </form>
  );
};
