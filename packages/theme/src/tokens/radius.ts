// Border radius tokens
export const radius = {
  none: "0px",
  xs: "0.125rem",    // 2px
  sm: "0.25rem",     // 4px
  md: "0.375rem",    // 6px
  lg: "0.5rem",      // 8px
  xl: "0.75rem",     // 12px
  "2xl": "1rem",     // 16px
  "3xl": "1.5rem",   // 24px
  full: "9999px",
} as const;

// Semantic radius tokens
export const semanticRadius = {
  // Component radius
  button: radius.md,
  input: radius.md,
  card: radius.lg,
  modal: radius.xl,
  tooltip: radius.sm,
  badge: radius.full,
  
  // Layout radius
  container: radius.lg,
  panel: radius.md,
  sidebar: radius.none,
  
  // Interactive elements
  checkbox: radius.sm,
  radio: radius.full,
  switch: radius.full,
  avatar: radius.full,
} as const;

export type Radius = typeof radius;
export type SemanticRadius = typeof semanticRadius;
