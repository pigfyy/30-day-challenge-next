import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  getDay,
  isSameDay,
  isWithinInterval,
  startOfDay,
  subDays,
} from "date-fns";
import {
  ChallengeSchema,
  DailyProgress,
  DailyProgressSchema,
} from "@30-day-challenge/prisma-zod";
import { z } from "zod";
import cuid from "cuid";

export type gridData = {
  dateValue: Date;
  isPadding: boolean;
  dailyProgress: DailyProgress | undefined;
  leftCompleted?: boolean;
  rightCompleted?: boolean;
  challengeId: string;
  dailyProgressId: string;
}[];

export const createCalendarDates = (
  challenge: z.infer<typeof ChallengeSchema>,
  dailyProgressData: z.infer<typeof DailyProgressSchema>[],
): gridData => {
  const dates = eachDayOfInterval({
    start: challenge.startDate,
    end: challenge.endDate,
  });

  const paddingBefore = getDay(challenge.startDate);
  const weekCount = Math.ceil((dates.length + paddingBefore) / 7);
  const paddingAfter = weekCount * 7 - (dates.length + paddingBefore);

  const gridData: gridData = [];

  // Add padding before dates
  for (let i = 0; i < paddingBefore; i++) {
    const date = subDays(challenge.startDate, paddingBefore - i);
    gridData.push({
      dateValue: date,
      isPadding: true,
      dailyProgress: undefined,
      challengeId: challenge.id,
      dailyProgressId: cuid(), // Generate a unique ID for padding dates
    });
  }

  // Add actual dates
  dates.forEach((date) => {
    let dailyProgress: DailyProgress | undefined = undefined;

    // Check if there's existing dailyProgress for this date
    const existingProgress = dailyProgressData.find(
      (dailyProgressDay) =>
        isSameDay(date, dailyProgressDay.date) &&
        dailyProgressDay.challengeId === challenge.id,
    );

    if (existingProgress) {
      dailyProgress = existingProgress;
    }

    gridData.push({
      dateValue: date,
      isPadding: false,
      dailyProgress,
      challengeId: challenge.id,
      dailyProgressId: dailyProgress ? dailyProgress.id : cuid(), // Use existing ID if dailyProgress exists, otherwise generate a new cuid()
    });
  });

  // Add padding after dates
  for (let i = 0; i < paddingAfter; i++) {
    const date = addDays(challenge.endDate, i + 1);
    gridData.push({
      dateValue: date,
      isPadding: true,
      dailyProgress: undefined,
      challengeId: challenge.id,
      dailyProgressId: cuid(), // Generate a unique ID for padding dates
    });
  }

  // After constructing the initial data, determine left and right completion status
  for (let i = 0; i < gridData.length; i++) {
    const current = gridData[i];
    const previous = gridData[i - 1];
    const next = gridData[i + 1];

    current.leftCompleted = previous
      ? !!previous.dailyProgress?.completed
      : false;
    current.rightCompleted = next ? !!next.dailyProgress?.completed : false;
  }

  return gridData;
};

export const isDateValid = (dateToCheck: Date, startDate: Date) => {
  return isWithinInterval(dateToCheck, {
    start: startOfDay(startDate),
    end: endOfDay(new Date()),
  });
};
