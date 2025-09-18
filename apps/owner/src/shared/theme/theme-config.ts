// Theme configuration with integration to packages/theme

import { tokens } from "@theme/tokens";

// Theme configuration for the booking system
export const themeConfig = {
  // Color schemes
  light: {
    primary: tokens.colors.light.primary,
    secondary: tokens.colors.light.secondary,
    accent: tokens.colors.light.accent,
    background: tokens.colors.light.background,
    foreground: tokens.colors.light.foreground,
    muted: tokens.colors.light.muted,
    border: tokens.colors.light.border,
    input: tokens.colors.light.input,
    ring: tokens.colors.light.ring,
    destructive: tokens.colors.light.destructive,
    success: tokens.colors.light.success,
    warning: tokens.colors.light.warning,
    info: tokens.colors.light.info,
  },
  dark: {
    primary: tokens.colors.dark.primary,
    secondary: tokens.colors.dark.secondary,
    accent: tokens.colors.dark.accent,
    background: tokens.colors.dark.background,
    foreground: tokens.colors.dark.foreground,
    muted: tokens.colors.dark.muted,
    border: tokens.colors.dark.border,
    input: tokens.colors.dark.input,
    ring: tokens.colors.dark.ring,
    destructive: tokens.colors.dark.destructive,
    success: tokens.colors.dark.success,
    warning: tokens.colors.dark.warning,
    info: tokens.colors.dark.info,
  },
} as const;

// Typography configuration
export const typographyConfig = {
  fontFamily: {
    sans: tokens.typography.fontFamily.sans,
    serif: tokens.typography.fontFamily.serif,
    mono: tokens.typography.fontFamily.mono,
  },
  fontSize: {
    xs: tokens.typography.fontSize.xs,
    sm: tokens.typography.fontSize.sm,
    base: tokens.typography.fontSize.base,
    lg: tokens.typography.fontSize.lg,
    xl: tokens.typography.fontSize.xl,
    "2xl": tokens.typography.fontSize["2xl"],
    "3xl": tokens.typography.fontSize["3xl"],
    "4xl": tokens.typography.fontSize["4xl"],
    "5xl": tokens.typography.fontSize["5xl"],
    "6xl": tokens.typography.fontSize["6xl"],
  },
  fontWeight: {
    thin: tokens.typography.fontWeight.thin,
    light: tokens.typography.fontWeight.light,
    normal: tokens.typography.fontWeight.normal,
    medium: tokens.typography.fontWeight.medium,
    semibold: tokens.typography.fontWeight.semibold,
    bold: tokens.typography.fontWeight.bold,
    extrabold: tokens.typography.fontWeight.extrabold,
    black: tokens.typography.fontWeight.black,
  },
  lineHeight: {
    none: tokens.typography.lineHeight.none,
    tight: tokens.typography.lineHeight.tight,
    snug: tokens.typography.lineHeight.snug,
    normal: tokens.typography.lineHeight.normal,
    relaxed: tokens.typography.lineHeight.relaxed,
    loose: tokens.typography.lineHeight.loose,
  },
} as const;

// Spacing configuration
export const spacingConfig = {
  ...tokens.spacing,
} as const;

// Radius configuration
export const radiusConfig = {
  ...tokens.radius,
} as const;

// Shadow configuration
export const shadowConfig = {
  ...tokens.shadows,
} as const;

// Component-specific theme configurations
export const componentThemes = {
  button: {
    variants: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    sizes: {
      sm: "h-9 rounded-md px-3",
      default: "h-10 px-4 py-2",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  input: {
    base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
  card: {
    base: "rounded-lg border bg-card text-card-foreground shadow-sm",
  },
  modal: {
    overlay: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
    content: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
  },
} as const;

// Animation configurations
export const animationConfig = {
  duration: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
  },
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// Breakpoint configurations
export const breakpointConfig = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Export all configurations
export const bookingThemeConfig = {
  colors: themeConfig,
  typography: typographyConfig,
  spacing: spacingConfig,
  radius: radiusConfig,
  shadows: shadowConfig,
  components: componentThemes,
  animation: animationConfig,
  breakpoints: breakpointConfig,
} as const;
