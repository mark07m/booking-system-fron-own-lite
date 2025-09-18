// Base color palette
export const baseColors = {
  // Grays
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  
  // Blues
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
  
  // Greens
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  
  // Yellows
  yellow: {
    50: "#fefce8",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },
  
  // Reds
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  
  // Purples
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
  
  // Pinks
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724",
  },
  
  // Oranges
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
} as const;

// Semantic color tokens
export const semanticColors = {
  // Primary colors
  primary: {
    50: baseColors.blue[50],
    100: baseColors.blue[100],
    200: baseColors.blue[200],
    300: baseColors.blue[300],
    400: baseColors.blue[400],
    500: baseColors.blue[500],
    600: baseColors.blue[600],
    700: baseColors.blue[700],
    800: baseColors.blue[800],
    900: baseColors.blue[900],
    950: baseColors.blue[950],
  },
  
  // Secondary colors
  secondary: {
    50: baseColors.gray[50],
    100: baseColors.gray[100],
    200: baseColors.gray[200],
    300: baseColors.gray[300],
    400: baseColors.gray[400],
    500: baseColors.gray[500],
    600: baseColors.gray[600],
    700: baseColors.gray[700],
    800: baseColors.gray[800],
    900: baseColors.gray[900],
    950: baseColors.gray[950],
  },
  
  // Success colors
  success: {
    50: baseColors.green[50],
    100: baseColors.green[100],
    200: baseColors.green[200],
    300: baseColors.green[300],
    400: baseColors.green[400],
    500: baseColors.green[500],
    600: baseColors.green[600],
    700: baseColors.green[700],
    800: baseColors.green[800],
    900: baseColors.green[900],
    950: baseColors.green[950],
  },
  
  // Warning colors
  warning: {
    50: baseColors.yellow[50],
    100: baseColors.yellow[100],
    200: baseColors.yellow[200],
    300: baseColors.yellow[300],
    400: baseColors.yellow[400],
    500: baseColors.yellow[500],
    600: baseColors.yellow[600],
    700: baseColors.yellow[700],
    800: baseColors.yellow[800],
    900: baseColors.yellow[900],
    950: baseColors.yellow[950],
  },
  
  // Error colors
  error: {
    50: baseColors.red[50],
    100: baseColors.red[100],
    200: baseColors.red[200],
    300: baseColors.red[300],
    400: baseColors.red[400],
    500: baseColors.red[500],
    600: baseColors.red[600],
    700: baseColors.red[700],
    800: baseColors.red[800],
    900: baseColors.red[900],
    950: baseColors.red[950],
  },
  
  // Info colors
  info: {
    50: baseColors.blue[50],
    100: baseColors.blue[100],
    200: baseColors.blue[200],
    300: baseColors.blue[300],
    400: baseColors.blue[400],
    500: baseColors.blue[500],
    600: baseColors.blue[600],
    700: baseColors.blue[700],
    800: baseColors.blue[800],
    900: baseColors.blue[900],
    950: baseColors.blue[950],
  },
} as const;

// Neutral colors
export const neutralColors = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
  current: "currentColor",
} as const;

// All colors combined
export const colors = {
  ...baseColors,
  ...semanticColors,
  ...neutralColors,
} as const;

export type BaseColors = typeof baseColors;
export type SemanticColors = typeof semanticColors;
export type NeutralColors = typeof neutralColors;
export type Colors = typeof colors;
