import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@/server/trpc";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url:
        process.env.NEXT_PUBLIC_TRPC_URL ||
        "http://192.168.68.87:3000/api/trpc",
      transformer: superjson,
    }),
  ],
});
