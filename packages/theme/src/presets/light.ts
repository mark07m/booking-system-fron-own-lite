import { colors } from "../tokens/colors";
import { radius } from "../tokens/radius";
import { shadows } from "../tokens/shadows";
import { spacing } from "../tokens/spacing";
import { fontFamilies, fontSizes, fontWeights, letterSpacing, lineHeights } from "../tokens/typography";

// Light theme preset
export const lightTheme = {
  // Colors
  colors: {
    // Background colors
    background: {
      primary: colors.white,
      secondary: colors.gray[50],
      tertiary: colors.gray[100],
      inverse: colors.gray[900],
    },
    
    // Text colors
    text: {
      primary: colors.gray[900],
      secondary: colors.gray[600],
      tertiary: colors.gray[500],
      inverse: colors.white,
      disabled: colors.gray[400],
    },
    
    // Border colors
    border: {
      primary: colors.gray[200],
      secondary: colors.gray[300],
      focus: colors.primary[500],
      error: colors.error[500],
      success: colors.success[500],
      warning: colors.warning[500],
    },
    
    // Interactive colors
    interactive: {
      primary: {
        default: colors.primary[500],
        hover: colors.primary[600],
        active: colors.primary[700],
        disabled: colors.gray[300],
      },
      secondary: {
        default: colors.gray[100],
        hover: colors.gray[200],
        active: colors.gray[300],
        disabled: colors.gray[100],
      },
      success: {
        default: colors.success[500],
        hover: colors.success[600],
        active: colors.success[700],
        disabled: colors.gray[300],
      },
      warning: {
        default: colors.warning[500],
        hover: colors.warning[600],
        active: colors.warning[700],
        disabled: colors.gray[300],
      },
      error: {
        default: colors.error[500],
        hover: colors.error[600],
        active: colors.error[700],
        disabled: colors.gray[300],
      },
    },
    
    // Status colors
    status: {
      success: {
        background: colors.success[50],
        text: colors.success[700],
        border: colors.success[200],
      },
      warning: {
        background: colors.warning[50],
        text: colors.warning[700],
        border: colors.warning[200],
      },
      error: {
        background: colors.error[50],
        text: colors.error[700],
        border: colors.error[200],
      },
      info: {
        background: colors.info[50],
        text: colors.info[700],
        border: colors.info[200],
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
  
  // Shadows
  shadows,
  
  // Theme metadata
  meta: {
    name: "light",
    displayName: "Light Theme",
    description: "Default light theme for the booking system",
  },
} as const;

export type LightTheme = typeof lightTheme;
