"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useImperativeHandle } from "react";

interface UseAutosizeTextAreaProps {
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  minHeight?: number;
  maxHeight?: number;
  triggerAutoSize: string;
}

export const useAutosizeTextArea = ({
  textAreaRef,
  triggerAutoSize,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutosizeTextAreaProps) => {
  const [init, setInit] = React.useState(true);
  React.useEffect(() => {
    const textAreaElement = textAreaRef.current;
    if (textAreaElement) {
      // Ensure the box model is consistent.
      textAreaElement.style.boxSizing = "border-box";

      // Reset height so we can accurately measure the natural scrollHeight.
      textAreaElement.style.height = `${minHeight}px`;
      const naturalScrollHeight = textAreaElement.scrollHeight;

      // Only apply the extra offset if the content would force a scrollbar.
      // In other words, if the natural scroll height exceeds the maxHeight.
      const hasScrollbar = naturalScrollHeight > maxHeight;
      const offsetBorder = hasScrollbar ? 6 : 0;

      // Set overflow: allow vertical scrolling only if needed.
      textAreaElement.style.overflowY = hasScrollbar ? "auto" : "hidden";
      textAreaElement.style.overflowX = "hidden";

      // On the initial render, set the minHeight (with offset if needed)
      // and the maxHeight (if provided).
      if (init) {
        textAreaElement.style.minHeight = `${minHeight + offsetBorder}px`;
        if (maxHeight > minHeight) {
          textAreaElement.style.maxHeight = `${maxHeight}px`;
        }
        setInit(false);
      }

      // Adjust the height.
      // If a scrollbar is present, cap the height at maxHeight.
      // Otherwise, let the height match the natural scroll height.
      const newHeight = hasScrollbar ? maxHeight : naturalScrollHeight;
      textAreaElement.style.height = `${newHeight}px`;
    }
  }, [textAreaRef.current, triggerAutoSize]);
};

export type AutosizeTextAreaRef = {
  textArea: HTMLTextAreaElement;
  maxHeight: number;
  minHeight: number;
};

type AutosizeTextAreaProps = {
  maxHeight?: number;
  minHeight?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AutosizeTextarea = React.forwardRef<
  AutosizeTextAreaRef,
  AutosizeTextAreaProps
>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 0,
      className,
      onChange,
      value,
      ...props
    }: AutosizeTextAreaProps,
    ref: React.Ref<AutosizeTextAreaRef>,
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [triggerAutoSize, setTriggerAutoSize] = React.useState("");

    useAutosizeTextArea({
      textAreaRef,
      triggerAutoSize,
      maxHeight,
      minHeight,
    });

    useImperativeHandle(ref, () => ({
      textArea: textAreaRef.current as HTMLTextAreaElement,
      focus: () => textAreaRef?.current?.focus(),
      maxHeight,
      minHeight,
    }));

    React.useEffect(() => {
      setTriggerAutoSize(value as string);
    }, [props?.defaultValue, value]);

    return (
      <textarea
        {...props}
        value={value}
        ref={textAreaRef}
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onChange={(e) => {
          setTriggerAutoSize(e.target.value);
          onChange?.(e);
        }}
      />
    );
  },
);
AutosizeTextarea.displayName = "AutosizeTextarea";
