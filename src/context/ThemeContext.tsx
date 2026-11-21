import {createContext,useContext,useEffect, useState,type ReactNode,} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  /** Current theme which is light or dark */
  theme: Theme;
  /** Switches the theme between light and dark */
  toggleTheme: () => void;
};

/**
 * Props of ThemeProvider.
 */

type ThemeProviderProps = {
  /** All pages and components that need the current theme */
  children: ReactNode;
};

/**
 * Context that holds the current theme for the whole app.
 * Starts as null and gets its real value from ThemeProvider.
 */
const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Provides the current theme to the whole app.
 * Saves the theme in localStorage so it stays the same after a refresh.
 * Wraps the App in main.tsx.
 */

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  /** Theme saved from the last visit or null on the first visit */
  const savedTheme = localStorage.getItem("theme");

  /**
   * Current theme of the app.
   * Starts with the saved theme or light.
   * Changed by toggleTheme.
   */

  const [theme, setTheme] = useState<Theme>(
    savedTheme === "dark" ? "dark" : "light",
  );

  /**
   * Runs every time the theme changes.
   * Adds or removes the dark class on the html tag so Tailwind dark styles work.
   * Saves the theme in localStorage.
   */

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Switches the theme between light and dark.
   * Called by the theme button in the Header.
   */

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook that gives the current theme from ThemeContext.
 * Throws an error if it is used outside ThemeProvider.
 * Used in Header.
 *
 * @returns The current theme and the toggleTheme function
 */

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
