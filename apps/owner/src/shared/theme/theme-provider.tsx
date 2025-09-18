// Theme provider with integration to packages/theme tokens

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as UIThemeProvider } from "@booking-system/ui";
import { tokens } from "@theme/tokens";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  tokens: typeof tokens;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface BookingThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function BookingThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "booking-system-theme",
}: BookingThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Load theme from localStorage
    const stored = localStorage.getItem(storageKey) as Theme;
    if (stored) {
      setTheme(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
    }

    // Apply CSS custom properties from theme tokens
    applyThemeTokens(resolvedTheme);
  }, [theme, resolvedTheme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    resolvedTheme,
    tokens,
  };

  return (
    <ThemeContext.Provider value={value}>
      <UIThemeProvider defaultTheme={theme} storageKey={storageKey}>
        {children}
      </UIThemeProvider>
    </ThemeContext.Provider>
  );
}

// Apply theme tokens to CSS custom properties
function applyThemeTokens(theme: "light" | "dark") {
  const root = document.documentElement;
  
  // Apply color tokens
  Object.entries(tokens.colors[theme]).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply spacing tokens
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Apply typography tokens
  Object.entries(tokens.typography).forEach(([key, value]) => {
    if (typeof value === "object") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        root.style.setProperty(`--typography-${key}-${subKey}`, subValue);
      });
    } else {
      root.style.setProperty(`--typography-${key}`, value);
    }
  });

  // Apply radius tokens
  Object.entries(tokens.radius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });

  // Apply shadow tokens
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
}

// Hook to use theme context
export function useBookingTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useBookingTheme must be used within a BookingThemeProvider");
  }

  return context;
}

// Theme toggle component
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useBookingTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
    >
      {resolvedTheme === "dark" ? "🌞" : "🌙"}
      <span className="ml-2">
        {resolvedTheme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}

// Language and theme selector component
export function LanguageThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useBookingTheme();

  return (
    <div className="flex items-center space-x-4">
      {/* Language selector would go here */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Theme:</span>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  );
}
