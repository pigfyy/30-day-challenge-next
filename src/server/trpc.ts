import { router } from "@/server/init";
import { challengeRouter } from "./routers/challengeRouter";
import { userRouter } from "./routers/userRouter";
import { dailyProgressRouter } from "./routers/dailyProgressRouter";
import { challengeIdeaRouter } from "./routers/challengeIdeaRouter";

export const appRouter = router({
  user: userRouter,
  challenge: challengeRouter,
  dailyProgress: dailyProgressRouter,
  challengeIdea: challengeIdeaRouter,
});

export type AppRouter = typeof appRouter;
