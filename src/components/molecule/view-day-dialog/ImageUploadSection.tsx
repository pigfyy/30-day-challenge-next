import React, { useState, useCallback, useRef } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";

interface UploadButtonProps {
  setSelectedFile: (file: File | string | null) => void;
}

const UploadButton = ({ setSelectedFile }: UploadButtonProps) => {
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

interface ImageUploadSectionProps {
  selectedFile: File | string | null;
  onFileChange: (file: File | string | null) => void;
}

export const ImageUploadSection = ({
  selectedFile,
  onFileChange,
}: ImageUploadSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const getPreviewUrl = () => {
    if (!selectedFile) return null;

    if (typeof selectedFile === "string") {
      return selectedFile;
    }

    return URL.createObjectURL(selectedFile);
  };

  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    if (!selectedFile) {
      setImageDimensions(null);
      return;
    }

    const promise = new Promise<{ width: number; height: number }>(
      (resolve) => {
        const ImageConstructor = window.Image as { new (): HTMLImageElement };
        const img = new ImageConstructor();
        img.onload = () => {
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };

        if (typeof selectedFile === "string") {
          img.src = selectedFile;
        } else {
          img.src = URL.createObjectURL(selectedFile);
        }
      },
    );

    promise.then(setImageDimensions);
  }, [selectedFile]);

  const previewImageUrl = getPreviewUrl();

  return (
    <Collapsible defaultOpen={true} open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-8">
        <span className="text-md font-bold">Upload an image</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <Separator className="mb-5 mt-1" />
      <CollapsibleContent>
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <UploadButton setSelectedFile={(file) => onFileChange(file)} />
            {selectedFile ? (
              <Button
                size="icon"
                variant="destructive"
                onClick={() => onFileChange(null)}
              >
                <X />
              </Button>
            ) : null}
          </div>
          <div className="mt-4">
            {selectedFile && previewImageUrl && imageDimensions ? (
              <Image
                src={previewImageUrl}
                alt={
                  typeof selectedFile === "string"
                    ? "Uploaded image"
                    : selectedFile.name || "Uploaded image"
                }
                layout="responsive"
                width={imageDimensions.width}
                height={imageDimensions.height}
                objectFit="contain"
              />
            ) : null}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
