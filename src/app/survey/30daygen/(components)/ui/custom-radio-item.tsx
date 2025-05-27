"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface CustomRadioItemProps {
  value: string;
  id: string;
  label: string;
  isSelected: boolean;
  variant?: "card" | "simple" | "inline";
  className?: string;
  labelClassName?: string;
}

export const CustomRadioItem = ({
  value,
  id,
  label,
  isSelected,
  variant = "card",
  className,
  labelClassName,
}: CustomRadioItemProps) => {
  if (variant === "simple") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <RadioGroupItem value={value} id={id} />
        <Label htmlFor={id} className={cn("mt-1 text-xs", labelClassName)}>
          {label}
        </Label>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <RadioGroupItem value={value} id={id} />
        <Label htmlFor={id} className={cn("text-sm", labelClassName)}>
          {label}
        </Label>
      </div>
    );
  }

  // Card variant - handle both labeled and unlabeled cases
  const hasLabel = label && label.trim() !== "";

  if (!hasLabel) {
    // For Likert scale - just centered radio button with background
    return (
      <div className={cn("relative h-full w-full", className)}>
        <RadioGroupItem value={value} id={id} className="sr-only" />
        <Label
          htmlFor={id}
          className={cn(
            "flex h-full w-full cursor-pointer items-center justify-center p-3 transition-all hover:bg-gray-100",
            isSelected ? "bg-blue-100" : "bg-transparent",
            labelClassName,
          )}
        >
          <div
            className={cn(
              "h-[18px] w-[18px] flex-shrink-0 rounded-full border-2",
              isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300",
            )}
          >
            {isSelected && (
              <div className="h-full w-full scale-50 rounded-full bg-white"></div>
            )}
          </div>
        </Label>
      </div>
    );
  }

  // Regular card variant with label
  return (
    <div className={cn("relative", className)}>
      <RadioGroupItem value={value} id={id} className="sr-only" />
      <Label
        htmlFor={id}
        className={cn(
          "flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50",
          isSelected ? "bg-blue-50 text-blue-900" : "bg-white",
          labelClassName,
        )}
      >
        <div
          className={cn(
            "mr-3 h-[18px] w-[18px] flex-shrink-0 rounded-full border-2",
            isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300",
          )}
        >
          {isSelected && (
            <div className="h-full w-full scale-50 rounded-full bg-white"></div>
          )}
        </div>
        {label}
      </Label>
    </div>
  );
};
