import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  className,
  maxLines = 4,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Check whether the paragraph is overflowing its clamped height.
  useEffect(() => {
    const el = textRef.current;
    if (el) {
      // When not expanded, the element is clamped (via CSS) to maxLines.
      // The scrollHeight is the full height, and clientHeight is the clamped height.
      setIsOverflowed(el.scrollHeight > el.clientHeight);
    }
  }, [text, expanded]);

  return (
    <div className="relative">
      <p
        ref={textRef}
        className={cn(
          `text-gray-600 ${!expanded ? "line-clamp-4" : ""}`,
          className,
        )}
      >
        {text}
      </p>
      {/* Show the "expand" icon only when the text is overflowing and not expanded */}
      {isOverflowed && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="absolute bottom-0 right-0 bg-white px-1"
          title="Show more"
        >
          <ChevronDown size={16} />
        </button>
      )}
      {/* When expanded, offer a "Show less" button below the text */}
      {isOverflowed && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-1 flex items-center gap-1 text-sm text-blue-500"
        >
          Show less <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
