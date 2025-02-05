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
import { Notebook } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

export const ViewChallengeHeader = ({
  challenge,
}: {
  challenge: Challenge;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <Notebook /> Add Note
        </Button>
      </section>
      <DialogComponent
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      >
        <DialogForm challenge={challenge} setIsDialogOpen={setIsDialogOpen} />
      </DialogComponent>
    </>
  );
};

const DialogComponent = ({
  isDialogOpen,
  setIsDialogOpen,
  children,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Note</DialogTitle>
          <DialogDescription>
            Write a note for this challenge. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const DialogForm = ({
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
