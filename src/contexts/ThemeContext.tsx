"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  isNewTheme: boolean;
  setIsNewTheme: (value: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "30-day-me-theme";

export function ThemeProvider({
  children,
  defaultTheme = true,
}: {
  children: ReactNode;
  defaultTheme?: boolean;
}) {
  const [isNewTheme, setIsNewThemeState] = useState(defaultTheme);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage on client side
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsNewThemeState(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isNewTheme));
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
    }
  }, [isNewTheme, isInitialized]);

  const setIsNewTheme = (value: boolean) => {
    setIsNewThemeState(value);
  };

  const toggleTheme = () => {
    setIsNewTheme(!isNewTheme);
  };

  return (
    <ThemeContext.Provider value={{ isNewTheme, setIsNewTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
