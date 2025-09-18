// Font families
export const fontFamilies = {
  sans: [
    "Inter",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  serif: [
    "ui-serif",
    "Georgia",
    "Cambria",
    "Times New Roman",
    "Times",
    "serif",
  ],
  mono: [
    "JetBrains Mono",
    "Fira Code",
    "Monaco",
    "Cascadia Code",
    "Segoe UI Mono",
    "Roboto Mono",
    "Oxygen Mono",
    "Ubuntu Monospace",
    "Source Code Pro",
    "Fira Mono",
    "Droid Sans Mono",
    "Courier New",
    "monospace",
  ],
} as const;

// Font sizes
export const fontSizes = {
  xs: ["0.75rem", { lineHeight: "1rem" }],        // 12px
  sm: ["0.875rem", { lineHeight: "1.25rem" }],    // 14px
  base: ["1rem", { lineHeight: "1.5rem" }],       // 16px
  lg: ["1.125rem", { lineHeight: "1.75rem" }],    // 18px
  xl: ["1.25rem", { lineHeight: "1.75rem" }],     // 20px
  "2xl": ["1.5rem", { lineHeight: "2rem" }],      // 24px
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }],   // 36px
  "5xl": ["3rem", { lineHeight: "1" }],           // 48px
  "6xl": ["3.75rem", { lineHeight: "1" }],        // 60px
  "7xl": ["4.5rem", { lineHeight: "1" }],         // 72px
  "8xl": ["6rem", { lineHeight: "1" }],           // 96px
  "9xl": ["8rem", { lineHeight: "1" }],           // 128px
} as const;

// Font weights
export const fontWeights = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

// Letter spacing
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

// Line heights
export const lineHeights = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

// Semantic typography tokens
export const semanticTypography = {
  // Headings
  h1: {
    fontSize: fontSizes["4xl"][0],
    lineHeight: fontSizes["4xl"][1].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSizes["3xl"][0],
    lineHeight: fontSizes["3xl"][1].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSizes["2xl"][0],
    lineHeight: fontSizes["2xl"][1].lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.tight,
  },
  h4: {
    fontSize: fontSizes.xl[0],
    lineHeight: fontSizes.xl[1].lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSizes.lg[0],
    lineHeight: fontSizes.lg[1].lineHeight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSizes.base[0],
    lineHeight: fontSizes.base[1].lineHeight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
  },
  
  // Body text
  body: {
    fontSize: fontSizes.base[0],
    lineHeight: fontSizes.base[1].lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm[0],
    lineHeight: fontSizes.sm[1].lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodyLarge: {
    fontSize: fontSizes.lg[0],
    lineHeight: fontSizes.lg[1].lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  
  // UI text
  caption: {
    fontSize: fontSizes.xs[0],
    lineHeight: fontSizes.xs[1].lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.wide,
  },
  label: {
    fontSize: fontSizes.sm[0],
    lineHeight: fontSizes.sm[1].lineHeight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
  },
  button: {
    fontSize: fontSizes.sm[0],
    lineHeight: fontSizes.sm[1].lineHeight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
  },
  code: {
    fontSize: fontSizes.sm[0],
    lineHeight: fontSizes.sm[1].lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },
} as const;

export type FontFamilies = typeof fontFamilies;
export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;
export type LetterSpacing = typeof letterSpacing;
export type LineHeights = typeof lineHeights;
export type SemanticTypography = typeof semanticTypography;
