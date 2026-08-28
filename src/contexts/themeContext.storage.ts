import { THEME_STORAGE_KEY } from 'constants/theme';

export function readStoredTheme(): boolean | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (value === 'light') return false;
    if (value === 'dark') return true;
  } catch {
    /* private mode */
  }
  return null;
}

export function writeStoredTheme(isDarkMode: boolean) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  } catch {
    /* private mode */
  }
}
