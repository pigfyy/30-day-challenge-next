import { router } from "@/server/init";
import { challengeRouter } from "./routers/challengeRouter";
import { userRouter } from "./routers/userRouter";
import { dailyProgressRouter } from "./routers/dailyProgressRouter";
import { challengeIdeaRouter } from "./routers/challengeIdeaRouter";
import { dailyTaskRouter } from "./routers/dailyTaskRouter";
import { surveyResponseRouter } from "./routers/surveyResponseRouter";

export const appRouter = router({
  user: userRouter,
  challenge: challengeRouter,
  dailyProgress: dailyProgressRouter,
  challengeIdea: challengeIdeaRouter,
  dailyTask: dailyTaskRouter,
  surveyResponse: surveyResponseRouter,
});

export type AppRouter = typeof appRouter;
