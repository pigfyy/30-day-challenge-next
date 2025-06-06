import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "@/server/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
