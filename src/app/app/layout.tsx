import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  return <>{children}</>;
}