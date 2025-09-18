// i18n middleware for Next.js App Router

import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Always show the locale in the URL
  localePrefix: "always",
  
  // Redirect to default locale if no locale is specified
  localeDetection: true,
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _static (inside /public)
    // - all root files inside /public (e.g. favicon.ico)
    "/((?!api|_next|_static|.*\\..*).*)",
  ],
};
