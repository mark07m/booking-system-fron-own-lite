// Shadow tokens
export const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// Semantic shadow tokens
export const semanticShadows = {
  // Component shadows
  button: {
    default: shadows.none,
    hover: shadows.sm,
    active: shadows.xs,
    focus: `0 0 0 3px rgb(59 130 246 / 0.5)`,
  },
  
  input: {
    default: shadows.none,
    focus: `0 0 0 3px rgb(59 130 246 / 0.5)`,
    error: `0 0 0 3px rgb(239 68 68 / 0.5)`,
  },
  
  card: {
    default: shadows.sm,
    hover: shadows.md,
    elevated: shadows.lg,
  },
  
  modal: {
    backdrop: "0 0 0 1000px rgb(0 0 0 / 0.5)",
    content: shadows.xl,
  },
  
  tooltip: {
    default: shadows.md,
  },
  
  dropdown: {
    default: shadows.lg,
  },
  
  // Layout shadows
  header: shadows.sm,
  sidebar: shadows.md,
  footer: shadows.sm,
  
  // Interactive shadows
  focus: `0 0 0 3px rgb(59 130 246 / 0.5)`,
  focusError: `0 0 0 3px rgb(239 68 68 / 0.5)`,
  focusSuccess: `0 0 0 3px rgb(34 197 94 / 0.5)`,
  focusWarning: `0 0 0 3px rgb(245 158 11 / 0.5)`,
} as const;

export type Shadows = typeof shadows;
export type SemanticShadows = typeof semanticShadows;
