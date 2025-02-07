"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // shadcn Dialog
import { Button } from "@/components/ui/button"; // shadcn Button
import Link from "next/link";
import { handleChallengeDelete } from "@/lib/actions/updateChallenge";

const Content: React.FC<{
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ setIsModalOpen }) => (
  <div className="flex flex-col items-start space-y-4">
    <Button variant="link" asChild>
      <Link href={"/challenge-display"}>challenge-display</Link>
    </Button>
    <Button
      onClick={async () => {
        await handleChallengeDelete("cm6u3vz4q0001rqnib8jjur0k");
      }}
    >
      delete challenge id
    </Button>
    <Button onClick={() => setIsModalOpen(false)} className="w-full">
      Close
    </Button>
  </div>
);

export function DevDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle keydown event for Alt + I
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "i") {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to the Modal!</DialogTitle>
        </DialogHeader>
        <Content setIsModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
}
