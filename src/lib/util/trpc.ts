import type { AppRouter } from "@/server/trpc";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url:
        process.env.NEXT_PUBLIC_TRPC_URL ||
        (true
          ? "http://localhost:3000/api/trpc"
          : "http://192.168.68.75:3000/api/trpc"),
      transformer: superjson,
    }),
    loggerLink({
      enabled: (opts) =>
        (process.env.NODE_ENV === "development" &&
          typeof window !== "undefined") ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
  ],
});
