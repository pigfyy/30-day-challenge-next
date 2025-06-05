export const dynamic = "force-dynamic";

import { HydrateClient } from "@/server/server";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Error</div>}>{children}</ErrorBoundary>
    </HydrateClient>
  );
}
