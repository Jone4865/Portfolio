import type { ReactNode } from 'react';

export type ThemeContextValue = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export type ThemeProviderProps = {
  children: ReactNode;
};
