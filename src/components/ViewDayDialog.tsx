import { Challenge, DailyProgress } from "@prisma/client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronsUpDown, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "./ui/separator";
import { handleDailyProgressUpdateSubmit } from "@/lib/actions/modifyDailyProgress";
import { isSameDay } from "date-fns";

export const UploadButton = ({
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
  dailyProgress,
  date,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  challenge: Challenge;
  dailyProgress: DailyProgress[];
  date: Date | undefined;
}) => {
  const { selectedFile, setSelectedFile, previewUrl, dimensions } =
    useImagePreview();
  const [isPending, startTransition] = useTransition();

  const day = date
    ? dailyProgress.find((dp) => isSameDay(dp.date, date))
    : undefined;

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(day?.imageUrl || null);
    }
  }, [isOpen, day, setSelectedFile]);

  function getChallengeDay(challenge: Challenge, date: Date) {
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

  if (!date) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[80vh] max-w-[60%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Day {getChallengeDay(challenge, date)} ---{" "}
            {date.toLocaleDateString()}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-7">
          <Collapsible defaultOpen={true}>
            <div className="flex items-center gap-8">
              <span className="text-md font-bold">Upload an image</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronsUpDown className="h-4 w-4" />
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
            onClick={() =>
              startTransition(() => {
                handleDailyProgressUpdateSubmit(
                  selectedFile,
                  challenge,
                  day,
                  date,
                );
                setIsOpen(false);
              })
            }
            className="mr-auto"
            disabled={isPending}
          >
            Submit Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
