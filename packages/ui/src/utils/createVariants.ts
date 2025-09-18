import { type VariantProps, cva } from "class-variance-authority";

/**
 * Utility function to create component variants using class-variance-authority
 * Provides type-safe variant props and consistent styling patterns
 */
export function createVariants<T extends Record<string, any>>(variants: T) {
  return variants;
}

/**
 * Helper to extract variant props from CVA variants
 */
export type ExtractVariantProps<T> = T extends (...args: any[]) => any
  ? VariantProps<T>
  : never;
