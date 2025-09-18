// Spacing scale (based on 4px grid)
export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem",   // 2px
  1: "0.25rem",      // 4px
  1.5: "0.375rem",   // 6px
  2: "0.5rem",       // 8px
  2.5: "0.625rem",   // 10px
  3: "0.75rem",      // 12px
  3.5: "0.875rem",   // 14px
  4: "1rem",         // 16px
  5: "1.25rem",      // 20px
  6: "1.5rem",       // 24px
  7: "1.75rem",      // 28px
  8: "2rem",         // 32px
  9: "2.25rem",      // 36px
  10: "2.5rem",      // 40px
  11: "2.75rem",     // 44px
  12: "3rem",        // 48px
  14: "3.5rem",      // 56px
  16: "4rem",        // 64px
  20: "5rem",        // 80px
  24: "6rem",        // 96px
  28: "7rem",        // 112px
  32: "8rem",        // 128px
  36: "9rem",        // 144px
  40: "10rem",       // 160px
  44: "11rem",       // 176px
  48: "12rem",       // 192px
  52: "13rem",       // 208px
  56: "14rem",       // 224px
  60: "15rem",       // 240px
  64: "16rem",       // 256px
  72: "18rem",       // 288px
  80: "20rem",       // 320px
  96: "24rem",       // 384px
} as const;

// Semantic spacing tokens
export const semanticSpacing = {
  // Component spacing
  button: {
    paddingX: spacing[3],
    paddingY: spacing[2],
    paddingXSmall: spacing[2],
    paddingYSmall: spacing[1],
    paddingXLarge: spacing[4],
    paddingYLarge: spacing[3],
    gap: spacing[2],
  },
  
  input: {
    paddingX: spacing[3],
    paddingY: spacing[2],
    paddingXSmall: spacing[2],
    paddingYSmall: spacing[1.5],
    paddingXLarge: spacing[4],
    paddingYLarge: spacing[3],
  },
  
  card: {
    padding: spacing[6],
    paddingSmall: spacing[4],
    paddingLarge: spacing[8],
    gap: spacing[4],
  },
  
  modal: {
    padding: spacing[6],
    paddingSmall: spacing[4],
    paddingLarge: spacing[8],
    gap: spacing[4],
  },
  
  // Layout spacing
  container: {
    paddingX: spacing[4],
    paddingY: spacing[6],
    paddingXSmall: spacing[2],
    paddingYSmall: spacing[4],
    paddingXLarge: spacing[6],
    paddingYLarge: spacing[8],
  },
  
  section: {
    paddingY: spacing[16],
    paddingYSmall: spacing[8],
    paddingYLarge: spacing[24],
  },
  
  // Grid spacing
  grid: {
    gap: spacing[4],
    gapSmall: spacing[2],
    gapLarge: spacing[6],
  },
  
  // Stack spacing
  stack: {
    gap: spacing[4],
    gapSmall: spacing[2],
    gapLarge: spacing[6],
  },
} as const;

export type Spacing = typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
