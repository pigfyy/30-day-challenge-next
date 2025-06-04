"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Quicksand } from "next/font/google";
import { useEffect } from "react";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isNewTheme } = useTheme();

  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (isNewTheme) {
      htmlElement.classList.add("new-theme");
      bodyElement.classList.add(quicksand.className);
    } else {
      htmlElement.classList.remove("new-theme");
      bodyElement.classList.remove(quicksand.className);
    }

    // Cleanup function to remove the class when component unmounts
    return () => {
      htmlElement.classList.remove("new-theme");
      bodyElement.classList.remove(quicksand.className);
    };
  }, [isNewTheme]);

  return <>{children}</>;
}
