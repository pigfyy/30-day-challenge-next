import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "@/lib/util/queryClient";
import { appRouter } from "@/server/trpc";
import { createCallerFactory } from "@/server/init";
import { createContext } from "@/server/context";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createContext);
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
