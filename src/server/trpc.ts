import { router } from "@/server/init";
import { challengeRouter } from "./routers/challengeRouter";
import { userRouter } from "./routers/userRouter";
import { dailyProgressRouter } from "./routers/dailyProgressRouter";

export const appRouter = router({
  user: userRouter,
  challenge: challengeRouter,
  dailyProgress: dailyProgressRouter,
});

export type AppRouter = typeof appRouter;
