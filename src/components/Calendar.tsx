"use client";

import { toast } from "@/hooks/use-toast";
import { createCalendarDates, gridData, isDateValid } from "@/lib/util/dates";
import { trpc } from "@/lib/util/trpc";
import {
  Challenge,
  ChallengeWithDailyProgress,
  DailyProgress,
} from "@/lib/db/drizzle/zod";
import { getDate, isSameDay } from "date-fns";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { ViewDayDialog } from "./organism/ViewDayDialog";
import { useGesture } from "@use-gesture/react";
import { Button } from "./ui/button";
import cuid from "cuid";

type CalendarProps = { challenge: ChallengeWithDailyProgress };

export default function Calendar({ challenge }: CalendarProps) {
  const [isViewDayDialogOpen, setIsViewDayDialogOpen] = useState(false);
  const [viewDayDialogDate, setViewDayDialogDate] = useState<
    undefined | Date
  >();

  const gridData = createCalendarDates(challenge);

  return (
    <>
      <div className="flex flex-col gap-2">
        <WeekDays />
        <div className="grid grid-cols-7">
          {gridData.map((item, index) => (
            <Day
              key={index}
              index={index}
              item={item}
              challenge={challenge}
              setIsViewDayDialogOpen={setIsViewDayDialogOpen}
              setViewDayDialogDate={setViewDayDialogDate}
            />
          ))}
        </div>
      </div>
      <>
        <ViewDayDialog
          isOpen={isViewDayDialogOpen}
          setIsOpen={setIsViewDayDialogOpen}
          challenge={challenge}
          date={viewDayDialogDate}
        />
      </>
    </>
  );
}

function WeekDays() {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekDays.map((day, index) => (
        <div key={index} className="flex flex-1 items-center justify-center">
          <span className="text-sm font-bold text-neutral-500 sm:text-lg">
            {day}
          </span>
        </div>
      ))}
    </div>
  );
}

function StridePadding({
  index,
  item,
}: {
  index: number;
  item: gridData[number];
}) {
  const isNotLeftEdge = index % 7 !== 0;
  const isNotRightEdge = index % 7 !== 6;
  const isCompleted = item.dailyProgress?.completed;

  return (
    <>
      {isNotLeftEdge && isCompleted && item.leftCompleted ? (
        <div className="absolute left-0 h-full w-[3px] bg-neutral-200"></div>
      ) : null}
      {isNotRightEdge && isCompleted && item.rightCompleted ? (
        <div className="absolute right-0 h-full w-[3px] bg-neutral-200"></div>
      ) : null}
    </>
  );
}

type DayProps = {
  index: number;
  item: gridData[number];
  challenge: ChallengeWithDailyProgress;
  setIsViewDayDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDayDialogDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

function Day({
  index,
  item,
  challenge,
  setIsViewDayDialogOpen,
  setViewDayDialogDate,
}: DayProps) {
  const utils = trpc.useUtils();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const bind = useGesture(
    isMobile
      ? {
          onDragStart: ({ event, direction: [, dy] }) => {
            if (
              isDateValid(item.dateValue, challenge.startDate) &&
              !item.isPadding &&
              dy === -1
            ) {
              setIsDragging(true);
              event.preventDefault();
            }
          },
          onDrag: ({ event, direction: [, dy] }) => {
            if (isDragging && dy === -1) {
              event.preventDefault();
            }
          },
          onDragEnd: ({ movement: [, y], direction: [, dy], event }) => {
            setIsDragging(false);
            if (dy === -1) {
              if (
                isDateValid(item.dateValue, challenge.startDate) &&
                !item.isPadding
              ) {
                handleMaximizeDay();
              }
            }
          },
        }
      : {},
  );

  const { mutate } = trpc.dailyProgress.upsertDailyProgress.useMutation({
    onMutate: async ({ newDailyProgress, existingRecord }) => {
      const previousChallenges =
        utils.challenge.getChallengesWithDailyProgress.getData() || [];

      const newRecord = {
        ...newDailyProgress,
        id: newDailyProgress.id || cuid(),
        imageUrl: newDailyProgress.imageUrl || "",
        userId: newDailyProgress.userId || "current-user-id",
        createdAt: newDailyProgress.createdAt || new Date(),
        note: newDailyProgress.note || "",
      };

      utils.challenge.getChallengesWithDailyProgress.setData(
        undefined,
        (oldChallenges) => {
          const currentChallenges = oldChallenges ?? previousChallenges;

          return currentChallenges.map((c) => {
            if (c.id !== challenge.id) {
              return c;
            }

            const existingDailyProgressIndex = c.dailyProgress.findIndex(
              (dp) => dp.id === newRecord.id,
            );

            let updatedDailyProgress;
            if (existingDailyProgressIndex !== -1) {
              updatedDailyProgress = c.dailyProgress.map((dp, index) =>
                index === existingDailyProgressIndex ? newRecord : dp,
              );
            } else {
              updatedDailyProgress = [...c.dailyProgress, newRecord];
            }

            return {
              ...c,
              dailyProgress: updatedDailyProgress,
            };
          });
        },
      );

      return { previousChallenges };
    },
    onError: (error, newChallenges, context) => {
      if (context?.previousChallenges) {
        utils.challenge.getChallengesWithDailyProgress.setData(
          undefined,
          context.previousChallenges,
        );
      }
      toast({
        title: "Error updating daily progress",
        description: error.message,
      });
    },
  });

  const isLeftEdge = index % 7 === 0;
  const isRightEdge = index % 7 === 6;

  const localItem = challenge.dailyProgress.find(
    (dp) =>
      dp.date.toDateString() === item.dateValue.toDateString() &&
      !item.isPadding,
  );

  const isCompleted = !!localItem?.completed && !item.isPadding;
  const isValidDay =
    isDateValid(item.dateValue, challenge.startDate) && !item.isPadding;

  let completedClasses = "";
  if (isCompleted) {
    completedClasses = "bg-neutral-200";
    const addRoundedClass = (condition: boolean, className: string) => {
      if (condition) {
        completedClasses += ` ${className}`;
      }
    };

    addRoundedClass(isLeftEdge || !item.leftCompleted, "rounded-l-xl");
    addRoundedClass(isRightEdge || !item.rightCompleted, "rounded-r-xl");
  }

  async function handleClick() {
    if (!isValidDay) {
      return;
    }

    mutate({
      newDailyProgress: {
        id: localItem?.id || item.dailyProgressId,
        date: item.dateValue,
        challengeId: challenge.id,
        completed: !isCompleted,
      },
      existingRecord: localItem,
    });
  }

  function handleMaximizeDay(
    e?: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
  ) {
    e?.stopPropagation();
    if (!isValidDay) {
      return;
    }
    setIsViewDayDialogOpen(true);
    setViewDayDialogDate(item.dateValue);
  }

  return (
    <button
      key={index}
      className={`flex aspect-square w-full flex-1 flex-row py-[3px] ${
        isDragging ? "overscroll-none select-none" : ""
      }`}
      onClick={handleClick}
      disabled={!isValidDay}
      ref={buttonRef}
      {...bind()}
      style={{ touchAction: isDragging ? "none" : "pan-y" }}
    >
      <div className="relative flex h-full w-full flex-1">
        <StridePadding index={index} item={item} />
        <div
          className={`group relative mx-[3px] flex flex-1 flex-col items-center justify-center ${completedClasses}`}
        >
          {isValidDay && !isMobile ? (
            <Maximize2
              className="absolute top-2 right-2 h-6 w-6 rounded-md p-1 text-neutral-400 opacity-0 transition-opacity duration-75 group-hover:opacity-100 hover:bg-white"
              onClick={handleMaximizeDay}
            />
          ) : null}
          <span
            className={`text-sm leading-4 sm:text-lg sm:leading-normal ${
              isValidDay ? "font-bold text-black" : "text-gray-400"
            }`}
          >
            {!item.isPadding ? getDate(item.dateValue) : null}
          </span>
          <span className="text-[12px] leading-4 sm:text-base sm:leading-normal">
            {isCompleted ? challenge.icon : null}
          </span>
        </div>
      </div>
    </button>
  );
}
