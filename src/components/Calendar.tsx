"use client";

import { toast } from "@/hooks/use-toast";
import { createCalendarDates, gridData, isDateValid } from "@/lib/util/dates";
import { trpc } from "@/lib/util/trpc";
import { Challenge, DailyProgress } from "@prisma/client";
import { getDate } from "date-fns";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { ViewDayDialog } from "./ViewDayDialog";

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
        <div className="grid grid-cols-7 p-2">
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
    <div className="grid grid-cols-7 gap-2 p-2">
      {weekDays.map((day, index) => (
        <div key={index} className="flex flex-1 items-center justify-center">
          <span className="text-lg font-bold text-neutral-500">{day}</span>{" "}
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

  const { mutate } = trpc.dailyProgress.upsertDailyProgress.useMutation({
    onMutate: async (newDailyProgress) => {
      const previousDailyProgress =
        utils.dailyProgress.getDailyProgress.getData({
          challengeId: challenge.id,
        }) || [];

      utils.dailyProgress.getDailyProgress.setData(
        { challengeId: challenge.id },
        (oldData) => {
          const currentData = oldData ?? previousDailyProgress;
          const newRecord = newDailyProgress as DailyProgress;

          // Check if the record already exists and update if so; otherwise, append
          if (currentData.find((dp) => dp.id === newRecord.id)) {
            return currentData.map((dp) =>
              dp.id === newRecord.id ? newRecord : dp,
            );
          }
          return [...currentData, newRecord];
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
    onSettled: () => {
      utils.dailyProgress.getDailyProgress.invalidate({
        challengeId: challenge.id,
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
      id: localItem?.id,
      date: item.dateValue,
      challengeId: challenge.id,
      completed: !isCompleted,
    });
  }

  function handleMaximizeDay(
    e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
  ) {
    e.stopPropagation();
    setIsViewDayDialogOpen(true);
    setViewDayDialogDate(item.dateValue);
  }

  return (
    <button
      className="flex aspect-square flex-1 flex-row py-[3px]"
      key={index}
      onClick={handleClick}
      disabled={!isDateValid(item.dateValue, challenge.startDate)}
      style={{ width: "100px", height: "100px" }}
    >
      <div className="relative flex h-full w-full flex-1">
        <StridePadding index={index} item={item} />
        <div
          className={`group relative mx-[3px] flex flex-1 flex-col items-center justify-center ${completedClasses}`}
        >
          {isDateValid(item.dateValue, challenge.startDate) ? (
            <Maximize2
              className="absolute right-2 top-2 h-6 w-6 rounded-md p-1 text-neutral-400 opacity-0 transition-opacity duration-75 hover:bg-white group-hover:opacity-100"
              onClick={handleMaximizeDay}
            />
          ) : null}
          <span
            className={
              isDateValid(item.dateValue, challenge.startDate)
                ? "text-lg font-bold text-black"
                : "text-lg text-gray-400"
            }
          >
            {!item.isPadding ? getDate(item.dateValue) : null}
          </span>
          <span>{isCompleted ? challenge.icon : null}</span>
        </div>
      </div>
    </button>
  );
}
