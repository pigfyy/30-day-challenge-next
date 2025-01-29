"use client";

import { createCalendarDates, gridData, isDateValid } from "@/lib/util/dates";
import { Challenge, DailyProgress } from "@prisma/client";
import { getDate } from "date-fns";
import { modifyDailyProgress } from "@/lib/actions/modifyDailyProgress";
import { useOptimistic } from "react";

type CalendarProps = {
  challenge: Challenge;
  dailyProgress: DailyProgress[];
};

export default function Calendar({ challenge, dailyProgress }: CalendarProps) {
  const gridData = createCalendarDates(challenge, dailyProgress);

  return (
    <div className="flex flex-col gap-2">
      <WeekDays />
      <div className="grid grid-cols-7 p-2">
        {gridData.map((item, index) => (
          <Day key={index} index={index} item={item} challenge={challenge} />
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
        <div key={index} className="flex-1 flex items-center justify-center">
          <span className="font-bold text-neutral-500 text-lg">{day}</span>{" "}
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
        <div className="bg-neutral-200 absolute w-[3px] h-full left-0"></div>
      ) : null}
      {isNotRightEdge && isCompleted && item.rightCompleted ? (
        <div className="bg-neutral-200 absolute w-[3px] h-full right-0"></div>
      ) : null}
    </>
  );
}

type DayProps = {
  index: number;
  item: gridData[number];
  challenge: Challenge;
};

function Day({ index, item, challenge }: DayProps) {
  const isLeftEdge = index % 7 == 0;
  const isRightEdge = index % 7 == 6;

  let completedClasses = "";

  if (item.dailyProgress?.completed) {
    completedClasses = "bg-neutral-200";
    if (
      (item.leftCompleted && !item.rightCompleted && !isLeftEdge) ||
      isRightEdge
    ) {
      completedClasses += " rounded-r-xl";
    }
    if (
      (item.rightCompleted && !item.leftCompleted && !isRightEdge) ||
      isLeftEdge
    ) {
      completedClasses += " rounded-l-xl";
    }
    if (!item.leftCompleted && !item.rightCompleted) {
      completedClasses += " rounded-xl";
    }
  }

  return (
    <button
      className="flex-1 aspect-square flex flex-row"
      key={index}
      onClick={() => {
        modifyDailyProgress(item, challenge);
      }}
      disabled={!isDateValid(item.dateValue, challenge.startDate)}
      style={{ width: "100px", height: "100px" }} // Increased size
    >
      <div className="w-full my-[3px] relative flex-1 flex">
        <StridePadding index={index} item={item} />
        <div
          className={`flex flex-1 items-center justify-center mx-[3px] flex-col ${completedClasses}`}
        >
          <span
            className={
              isDateValid(item.dateValue, challenge.startDate)
                ? "text-black font-bold text-lg"
                : "text-gray-400 text-lg"
            }
          >
            {!item.isPadding ? getDate(item.dateValue) : null}
          </span>
          <span>{item.dailyProgress?.completed ? challenge.icon : null}</span>
        </div>
      </div>
    </button>
  );
}
