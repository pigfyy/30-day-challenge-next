"use client";

import { modifyDailyProgress } from "@/lib/actions/modifyDailyProgress";
import { createCalendarDates, gridData, isDateValid } from "@/lib/util/dates";
import { Challenge, DailyProgress } from "@prisma/client";
import { getDate, isDate, startOfDay } from "date-fns";
import { Maximize2 } from "lucide-react";
import { useOptimistic, useTransition } from "react";

type CalendarProps = {
  challenge: Challenge;
  dailyProgress: DailyProgress[];
};

type OptimisticUpdate = Partial<DailyProgress> & {
  date: Date;
};

export default function Calendar({ challenge, dailyProgress }: CalendarProps) {
  const [optimisticDailyProgress, addOptimisticDailyProgress] = useOptimistic<
    DailyProgress[],
    OptimisticUpdate
  >(
    dailyProgress,
    (
      currentDailyProgress: DailyProgress[],
      newDailyProgress: OptimisticUpdate,
    ) => {
      // Ensure the date is the start of the day for comparison
      const newDate = startOfDay(newDailyProgress.date);

      const existingIndex = currentDailyProgress.findIndex((dp) => {
        const dpDate = startOfDay(dp.date);
        return dpDate.getTime() === newDate.getTime();
      });

      if (existingIndex > -1) {
        // Update existing DailyProgress
        return currentDailyProgress.map((dp) =>
          dp.id === newDailyProgress.id
            ? { ...dp, completed: newDailyProgress.completed || false }
            : dp,
        );
      } else {
        // Add new DailyProgress, ensuring imageUrl is set
        return [
          ...currentDailyProgress,
          {
            id: `temp-${newDailyProgress.date.getTime()}`, // Temporary ID
            date: newDailyProgress.date,
            completed: newDailyProgress.completed || false,
            imageUrl: "", // Provide a default value for imageUrl, or fetch it if necessary
            challengeId: newDailyProgress.challengeId!,
            userId: "", // Provide the appropriate userId
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
    },
  );

  const gridData = createCalendarDates(challenge, optimisticDailyProgress);

  return (
    <div className="flex flex-col gap-2">
      <WeekDays />
      <div className="grid grid-cols-7 p-2">
        {gridData.map((item, index) => (
          <Day
            key={index}
            index={index}
            item={item}
            challenge={challenge}
            optimisticDailyProgress={optimisticDailyProgress}
            addOptimisticDailyProgress={addOptimisticDailyProgress}
          />
        ))}
      </div>
    </div>
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
  optimisticDailyProgress: DailyProgress[];
  addOptimisticDailyProgress: any;
};

function Day({
  index,
  item,
  challenge,
  optimisticDailyProgress,
  addOptimisticDailyProgress,
}: DayProps) {
  const [, startTransition] = useTransition();

  const isLeftEdge = index % 7 == 0;
  const isRightEdge = index % 7 == 6;

  const localItem = optimisticDailyProgress.find(
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

    startTransition(() => {
      const optimisticUpdate: Partial<DailyProgress> = {
        completed: !isCompleted,
        date: item.dateValue,
        challengeId: challenge.id,
        id: localItem?.id,
      };

      if (optimisticUpdate.id && /^temp-\d+$/.test(optimisticUpdate.id)) {
        optimisticUpdate.id = undefined;
        throw new Error("Attempted to use temporary ID in database operation");
      }

      addOptimisticDailyProgress(optimisticUpdate);

      try {
        modifyDailyProgress(item, challenge);
      } catch (error) {
        console.error("Failed to update daily progress:", error);
      }
    });
  }

  function handleMaximizeDay(
    e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
  ) {
    e.stopPropagation();

    console.log("Maximizing day:", item.dateValue);
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
