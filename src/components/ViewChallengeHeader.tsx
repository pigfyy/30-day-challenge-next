"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { handleChallengeUpdate } from "@/lib/actions/updateChallenge";
import { Challenge } from "@prisma/client";
import { Notebook, Pencil } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { EditChallenge } from "./ChallengeForms";

export const ViewChallengeHeader = ({
  challenge,
}: {
  challenge: Challenge;
}) => {
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
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => setIsEditChallengeDialogOpen(true)}
          >
            <Pencil /> Edit Challenge
          </Button>
          <Button variant="outline" onClick={() => setIsNoteDialogOpen(true)}>
            <Notebook /> Add Note
          </Button>
        </div>
      </section>
      <>
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
