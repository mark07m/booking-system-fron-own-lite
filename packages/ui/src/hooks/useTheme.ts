import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { theme, setTheme, resolvedTheme } = context;

  return {
    theme,
    setTheme,
    resolvedTheme,
    // Helper functions
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
  };
}
