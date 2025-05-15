"use client";

import { toast } from "@/hooks/use-toast";
import { createCalendarDates, gridData, isDateValid } from "@/lib/util/dates";
import { trpc } from "@/lib/util/trpc";
import { Challenge, DailyProgress } from "@/lib/db/prisma-zod-types";
import { getDate } from "date-fns";
import { Maximize2 } from "lucide-react";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { ViewDayDialog } from "./ViewDayDialog";
import { useGesture } from "@use-gesture/react";
import cuid from "cuid";

type CalendarProps = {
  challenge: Challenge;
  dailyProgress: DailyProgress[];
};

export default function Calendar({ challenge, dailyProgress }: CalendarProps) {
  const [isViewDayDialogOpen, setIsViewDayDialogOpen] = useState(false);
  const [viewDayDialogDate, setViewDayDialogDate] = useState<
    undefined | Date
  >();

  const gridData = createCalendarDates(challenge, dailyProgress);

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
              dailyProgress={dailyProgress}
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
          dailyProgress={dailyProgress}
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
  challenge: Challenge;
  dailyProgress: DailyProgress[];
  setIsViewDayDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDayDialogDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

function Day({
  index,
  item,
  challenge,
  dailyProgress,
  setIsViewDayDialogOpen,
  setViewDayDialogDate,
}: DayProps) {
  const utils = trpc.useUtils();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const bind = useGesture(
    isMobile
      ? {
          onDragEnd: ({ movement: [, y], direction: [, dy], event }) => {
            if (dy === -1 && Math.abs(y) > 50) {
              handleMaximizeDay();
            }
          },
        }
      : {},
  );

  const { mutate } = trpc.dailyProgress.upsertDailyProgress.useMutation({
    onMutate: async (newDailyProgress) => {
      const previousDailyProgress =
        utils.dailyProgress.getDailyProgress.getData({
          challengeId: challenge.id,
        }) || [];

      const newRecord = {
        ...newDailyProgress,
        id: newDailyProgress.id || cuid(),
        imageUrl: newDailyProgress.imageUrl || "",
        userId: newDailyProgress.userId || "current-user-id",
        createdAt: newDailyProgress.createdAt || new Date(),
        updatedAt: newDailyProgress.updatedAt || new Date(),
        note: newDailyProgress.note || "",
      };

      utils.dailyProgress.getDailyProgress.setData(
        { challengeId: challenge.id },
        (oldData) => {
          const currentData = oldData ?? previousDailyProgress;

          const existingRecordIndex = currentData.findIndex(
            (dp) => dp.id === newRecord.id,
          );

          if (existingRecordIndex !== -1) {
            const updatedData = [...currentData];
            updatedData[existingRecordIndex] = newRecord;
            return updatedData;
          } else {
            return [...currentData, newRecord];
          }
        },
      );

      return { previousDailyProgress };
    },
    onError: (error, newDailyProgress, context) => {
      if (context?.previousDailyProgress) {
        utils.dailyProgress.getDailyProgress.setData(
          { challengeId: challenge.id },
          context.previousDailyProgress,
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

  const localItem = dailyProgress.find(
    (dp) => dp.date.toDateString() === item.dateValue.toDateString(),
  );

  const isCompleted = !!localItem?.completed;

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
    if (!isDateValid(item.dateValue, challenge.startDate)) {
      return;
    }

    mutate({
      id: localItem?.id || item.dailyProgressId,
      date: item.dateValue,
      challengeId: challenge.id,
      completed: !isCompleted,
    });
  }

  function handleMaximizeDay(
    e?: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
  ) {
    e?.stopPropagation();
    setIsViewDayDialogOpen(true);
    setViewDayDialogDate(item.dateValue);
  }

  return (
    <button
      key={index}
      className="flex aspect-square w-full flex-1 touch-none flex-row py-[3px]"
      onClick={handleClick}
      disabled={!isDateValid(item.dateValue, challenge.startDate)}
      ref={buttonRef}
      {...bind()}
    >
      <div className="relative flex h-full w-full flex-1">
        <StridePadding index={index} item={item} />
        <div
          className={`group relative mx-[3px] flex flex-1 flex-col items-center justify-center ${completedClasses}`}
        >
          {isDateValid(item.dateValue, challenge.startDate) && !isMobile ? (
            <Maximize2
              className="absolute right-2 top-2 h-6 w-6 rounded-md p-1 text-neutral-400 opacity-0 transition-opacity duration-75 hover:bg-white group-hover:opacity-100"
              onClick={handleMaximizeDay}
            />
          ) : null}
          <span
            className={`text-sm leading-4 sm:text-lg sm:leading-normal ${
              isDateValid(item.dateValue, challenge.startDate)
                ? "font-bold text-black"
                : "text-gray-400"
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
