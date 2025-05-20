"use client";

import { DevDialog } from "@/components/DevDialog";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { trpc, trpcClient } from "@/lib/util/trpc";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider afterSignOutUrl="/">
          <html lang="en">
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta name="overscroll-behavior" content="none" />
              <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="flex min-h-screen flex-col bg-gray-50">
              <Suspense
                fallback={
                  <div className="flex h-screen w-full items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin" />
                  </div>
                }
              >
                <Header />
                <SignedIn>
                  <main className="flex flex-1">{children}</main>
                </SignedIn>
                <SignedOut>
                  <main className="flex flex-1">{children}</main>
                </SignedOut>
                <Toaster />
                {/* DEVELOPER TOOLS */}
                <DevDialog />
                <Analytics />
              </Suspense>
            </body>
          </html>
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
