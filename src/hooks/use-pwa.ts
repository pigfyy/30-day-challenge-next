import { useEffect, useState } from "react";

/**
 * Hook to detect if the app is running as a PWA
 * @returns Object containing isPwa flag and isClient flag
 */
export function usePwa() {
  const [isPwa, setIsPwa] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if the app is running in standalone mode (PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    setIsPwa(isStandalone);

    // Listen for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPwa(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return { isPwa, isClient };
}
