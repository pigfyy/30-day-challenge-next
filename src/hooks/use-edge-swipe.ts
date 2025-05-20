import { useRef, useState } from "react";
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
            const isFromLeftEdge = startX <= 80;
            const isFromRightEdge = startX >= windowWidth - 80;

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

  return {
    containerRef,
    bind,
    style: {
      touchAction: "pan-y", // Allow vertical scrolling
      position: "relative" as const,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "80px",
        zIndex: 1,
        touchAction: "none",
      },
      "&::before": { left: 0 },
      "&::after": { right: 0 },
    },
  };
};
