import { lightTheme, darkTheme } from "./presets/light";

// Type for theme structure
type Theme = typeof lightTheme;

// Helper function to flatten nested objects and create CSS variables
function flattenToCSSVars(
  obj: Record<string, any>,
  prefix = "",
  result: Record<string, string> = {}
): Record<string, string> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const cssVarName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // Recursively flatten nested objects
        flattenToCSSVars(value, cssVarName, result);
      } else if (typeof value === "string" || typeof value === "number") {
        // Convert to CSS variable format
        result[`--${cssVarName}`] = String(value);
      }
    }
  }
  return result;
}

// Generate CSS variables for light theme
export const lightThemeCSSVars = flattenToCSSVars(lightTheme);

// Generate CSS variables for dark theme
export const darkThemeCSSVars = flattenToCSSVars(darkTheme);

// Generate CSS custom properties string
export function generateCSSVars(theme: Theme): string {
  const vars = flattenToCSSVars(theme);
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}

// Generate CSS for light theme
export const lightThemeCSS = `:root {
${generateCSSVars(lightTheme)}
}`;

// Generate CSS for dark theme
export const darkThemeCSS = `@media (prefers-color-scheme: dark) {
  :root {
${generateCSSVars(darkTheme)}
  }
}

[data-theme="dark"] {
${generateCSSVars(darkTheme)}
}`;

// Generate complete CSS with both themes
export const themeCSS = `${lightThemeCSS}

${darkThemeCSS}`;

// Utility function to get CSS variable value
export function getCSSVar(varName: string, fallback?: string): string {
  return `var(--${varName}${fallback ? `, ${fallback}` : ""})`;
}

// Common CSS variable names for easy access
export const cssVars = {
  // Colors
  colors: {
    background: {
      primary: getCSSVar("colors-background-primary"),
      secondary: getCSSVar("colors-background-secondary"),
      tertiary: getCSSVar("colors-background-tertiary"),
      inverse: getCSSVar("colors-background-inverse"),
    },
    text: {
      primary: getCSSVar("colors-text-primary"),
      secondary: getCSSVar("colors-text-secondary"),
      tertiary: getCSSVar("colors-text-tertiary"),
      inverse: getCSSVar("colors-text-inverse"),
      disabled: getCSSVar("colors-text-disabled"),
    },
    border: {
      primary: getCSSVar("colors-border-primary"),
      secondary: getCSSVar("colors-border-secondary"),
      focus: getCSSVar("colors-border-focus"),
      error: getCSSVar("colors-border-error"),
      success: getCSSVar("colors-border-success"),
      warning: getCSSVar("colors-border-warning"),
    },
  },
  
  // Spacing
  spacing: (value: string) => getCSSVar(`spacing-${value}`),
  
  // Typography
  typography: {
    fontFamily: (family: string) => getCSSVar(`typography-fontFamilies-${family}`),
    fontSize: (size: string) => getCSSVar(`typography-fontSizes-${size}`),
    fontWeight: (weight: string) => getCSSVar(`typography-fontWeights-${weight}`),
    lineHeight: (height: string) => getCSSVar(`typography-lineHeights-${height}`),
    letterSpacing: (spacing: string) => getCSSVar(`typography-letterSpacing-${spacing}`),
  },
  
  // Radius
  radius: (value: string) => getCSSVar(`radius-${value}`),
  
  // Shadows
  shadow: (value: string) => getCSSVar(`shadows-${value}`),
} as const;
