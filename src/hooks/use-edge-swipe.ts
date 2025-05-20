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

  // Disable browser's default back/forward gestures
  useEffect(() => {
    if (!isMobile) return;

    const preventDefault = (e: TouchEvent) => {
      // Only prevent if the touch starts within our edge detection area
      const touch = e.touches[0];
      const windowWidth = window.innerWidth;
      const isFromLeftEdge = touch.clientX <= 60;
      const isFromRightEdge = touch.clientX >= windowWidth - 60;

      if (isFromLeftEdge || isFromRightEdge) {
        e.preventDefault();
      }
    };

    // Add passive: false to allow preventDefault
    document.addEventListener("touchstart", preventDefault, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

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
            }
          },
          onDragEnd: ({ movement: [x], direction: [dx] }) => {
            if (startX === null) return;

            const windowWidth = window.innerWidth;
            const isFromLeftEdge = startX <= 60;
            const isFromRightEdge = startX >= windowWidth - 60;

            if (isFromLeftEdge && dx === 1 && Math.abs(x) > 50) {
              onSwipe?.(SwipeDirection.RIGHT);
            } else if (isFromRightEdge && dx === -1 && Math.abs(x) > 50) {
              onSwipe?.(SwipeDirection.LEFT);
            }

            setStartX(null);
          },
        }
      : {},
  );

  return { containerRef, bind };
};
