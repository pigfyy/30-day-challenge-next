"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CustomCheckboxItemProps {
  value: string;
  id: string;
  label: string;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: "card" | "inline";
  className?: string;
  labelClassName?: string;
}

export const CustomCheckboxItem = ({
  value,
  id,
  label,
  isChecked,
  onCheckedChange,
  variant = "card",
  className,
  labelClassName,
}: CustomCheckboxItemProps) => {
  if (variant === "inline") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <Checkbox
          id={id}
          checked={isChecked}
          onCheckedChange={onCheckedChange}
        />
        <Label htmlFor={id} className={cn("text-sm", labelClassName)}>
          {label}
        </Label>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
        className="sr-only"
      />
      <Label
        htmlFor={id}
        className={cn(
          "flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50",
          isChecked ? "bg-blue-50 text-blue-900" : "bg-white",
          labelClassName,
        )}
      >
        <div
          className={cn(
            "mr-3 h-[18px] w-[18px] flex-shrink-0 rounded border-2 transition-all",
            isChecked ? "border-blue-500 bg-blue-500" : "border-gray-300",
          )}
        >
          {isChecked && (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-3 w-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {label}
      </Label>
    </div>
  );
};
