"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isNewTheme } = useTheme();

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isNewTheme) {
      htmlElement.classList.add("new-theme");
    } else {
      htmlElement.classList.remove("new-theme");
    }

    // Cleanup function to remove the class when component unmounts
    return () => {
      htmlElement.classList.remove("new-theme");
    };
  }, [isNewTheme]);

  return <>{children}</>;
}
