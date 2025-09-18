import { colors } from "../tokens/colors";
import { radius } from "../tokens/radius";
import { shadows } from "../tokens/shadows";
import { spacing } from "../tokens/spacing";
import { fontFamilies, fontSizes, fontWeights, letterSpacing, lineHeights } from "../tokens/typography";

// Dark theme preset
export const darkTheme = {
  // Colors
  colors: {
    // Background colors
    background: {
      primary: colors.gray[900],
      secondary: colors.gray[800],
      tertiary: colors.gray[700],
      inverse: colors.white,
    },
    
    // Text colors
    text: {
      primary: colors.white,
      secondary: colors.gray[300],
      tertiary: colors.gray[400],
      inverse: colors.gray[900],
      disabled: colors.gray[500],
    },
    
    // Border colors
    border: {
      primary: colors.gray[700],
      secondary: colors.gray[600],
      focus: colors.primary[400],
      error: colors.error[400],
      success: colors.success[400],
      warning: colors.warning[400],
    },
    
    // Interactive colors
    interactive: {
      primary: {
        default: colors.primary[500],
        hover: colors.primary[400],
        active: colors.primary[300],
        disabled: colors.gray[600],
      },
      secondary: {
        default: colors.gray[700],
        hover: colors.gray[600],
        active: colors.gray[500],
        disabled: colors.gray[700],
      },
      success: {
        default: colors.success[500],
        hover: colors.success[400],
        active: colors.success[300],
        disabled: colors.gray[600],
      },
      warning: {
        default: colors.warning[500],
        hover: colors.warning[400],
        active: colors.warning[300],
        disabled: colors.gray[600],
      },
      error: {
        default: colors.error[500],
        hover: colors.error[400],
        active: colors.error[300],
        disabled: colors.gray[600],
      },
    },
    
    // Status colors
    status: {
      success: {
        background: colors.success[900],
        text: colors.success[200],
        border: colors.success[700],
      },
      warning: {
        background: colors.warning[900],
        text: colors.warning[200],
        border: colors.warning[700],
      },
      error: {
        background: colors.error[900],
        text: colors.error[200],
        border: colors.error[700],
      },
      info: {
        background: colors.info[900],
        text: colors.info[200],
        border: colors.info[700],
      },
    },
  },
  
  // Spacing
  spacing,
  
  // Typography
  typography: {
    fontFamilies,
    fontSizes,
    fontWeights,
    letterSpacing,
    lineHeights,
  },
  
  // Radius
  radius,
  
  // Shadows (adjusted for dark theme)
  shadows: {
    ...shadows,
    // Enhanced shadows for dark theme
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.5)",
  },
  
  // Theme metadata
  meta: {
    name: "dark",
    displayName: "Dark Theme",
    description: "Dark theme for the booking system",
  },
} as const;

export type DarkTheme = typeof darkTheme;
