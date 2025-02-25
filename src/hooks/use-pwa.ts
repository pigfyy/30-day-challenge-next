import { useEffect, useState } from "react";

/**
 * Hook to detect if the app is running as a PWA and if the device is mobile
 * @returns Object containing isPwa and isMobile flags
 */
export function usePwa() {
  const [isPwa, setIsPwa] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if the app is running in standalone mode (PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    // Check if the device is mobile
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      return (
        /android|iPad|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent,
        ) || window.innerWidth <= 768
      );
    };

    setIsPwa(isStandalone);
    setIsMobile(checkMobile());

    // Listen for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPwa(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Listen for resize events to update mobile status
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isPwa, isMobile, isClient };
}
