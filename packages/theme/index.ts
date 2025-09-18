export { colors } from "./tokens/colors";
export { spacing } from "./tokens/spacing";
export { typography } from "./tokens/typography";
export { shadows } from "./tokens/shadows";
export { breakpoints } from "./tokens/breakpoints";

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  breakpoints,
} as const;

export type Theme = typeof theme;
