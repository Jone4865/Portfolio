import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "../styled/theme";

const STORAGE_KEY = "portfolio-theme";

function readStoredTheme(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "light") return false;
    if (v === "dark") return true;
  } catch {
    /* private mode */
  }
  return null;
}

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const CustomThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => readStoredTheme() ?? true,
  );

  const toggleTheme = useCallback(() => {
    setIsDarkMode((d) => !d);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, isDarkMode ? "dark" : "light");
    } catch {
      /* */
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
