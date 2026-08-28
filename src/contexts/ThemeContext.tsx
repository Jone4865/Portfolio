import { createContext, useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from 'data/themes';
import type { ThemeContextValue, ThemeProviderProps } from 'types/themeContext';

import { readStoredTheme, writeStoredTheme } from './themeContext.storage';

export const ThemeContext = createContext<ThemeContextValue>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export function CustomThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => readStoredTheme() ?? true);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((dark) => !dark);
  }, []);

  useEffect(() => {
    writeStoredTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
