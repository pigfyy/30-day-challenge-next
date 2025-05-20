import { useRef, useState, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { isMobile } from "react-device-detect";

export enum SwipeDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

type EdgeSwipeCallbacks = { onSwipe: (direction: SwipeDirection) => void };

export const useEdgeSwipe = ({ onSwipe }: EdgeSwipeCallbacks) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Disable browser's default back/forward gestures
  useEffect(() => {
    if (!isMobile) return;

    const preventDefault = (e: TouchEvent) => {
      // Only prevent if we're actually dragging
      if (isDragging) {
        e.preventDefault();
      }
    };

    // Add passive: false to allow preventDefault
    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [isDragging]);

  const bind = useGesture(
    isMobile
      ? {
          onDragStart: ({ event }) => {
            // Get the initial x position from either touch or mouse event
            const clientX =
              "touches" in event
                ? (event as TouchEvent).touches[0]?.clientX
                : (event as MouseEvent).clientX;

            if (clientX !== undefined) {
              setStartX(clientX);
              setIsDragging(true);
            }
          },
          onDragEnd: ({ movement: [x], direction: [dx] }) => {
            if (startX === null) return;

            const windowWidth = window.innerWidth;
            const isFromLeftEdge = startX <= 80;
            const isFromRightEdge = startX >= windowWidth - 80;

            if (isFromLeftEdge && dx === 1 && Math.abs(x) > 50) {
              onSwipe?.(SwipeDirection.RIGHT);
            } else if (isFromRightEdge && dx === -1 && Math.abs(x) > 50) {
              onSwipe?.(SwipeDirection.LEFT);
            }

            setStartX(null);
            setIsDragging(false);
          },
        }
      : {},
  );

  return { containerRef, bind };
};
