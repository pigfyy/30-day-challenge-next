"use client";

import { DevDialog } from "@/components/DevDialog";
import { Header } from "@/components/Header";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { TRPCProvider } from "@/lib/util/trpc";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeContext";
// Service worker disabled
// import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme={false}>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="overscroll-behavior" content="none" />
          <link rel="icon" href="/favicon.ico" />
          <title>30 Day Me</title>
          <meta
            name="description"
            content="30 Day Me is a platform for creating and tracking 30-day challenges."
          />
          <meta name="apple-itunes-app" content="app-id=6755921080" />
          <meta property="og:image" content="/logo.png" />
        </head>
        <body className={`bg-background-darker flex min-h-screen flex-col`}>
          <TRPCProvider>
            <ThemeWrapper>
              <PostHogProvider>
                <Suspense
                  fallback={
                    <div className="flex h-screen w-full items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  {/* Service worker disabled */}
                  {/* <ServiceWorkerRegistration /> */}
                  <Header />
                  <main className="flex flex-1">{children}</main>
                  <Toaster />
                  {/* DEVELOPER TOOLS */}
                  <DevDialog />
                  <Analytics />
                </Suspense>
              </PostHogProvider>
            </ThemeWrapper>
          </TRPCProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
