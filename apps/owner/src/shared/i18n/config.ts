// Internationalization configuration

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Supported locales
export const locales = ["en", "ru", "uk"] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = "en";

// Locale configuration
export const localeConfig = {
  en: {
    name: "English",
    flag: "🇺🇸",
    direction: "ltr" as const,
  },
  ru: {
    name: "Русский",
    flag: "🇷🇺",
    direction: "ltr" as const,
  },
  uk: {
    name: "Українська",
    flag: "🇺🇦",
    direction: "ltr" as const,
  },
} as const;

// Get locale from request
export function getLocale(request: Request): Locale {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Extract locale from pathname
  const segments = pathname.split("/");
  const locale = segments[1];
  
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  
  return defaultLocale;
}

// Check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/");
  const locale = segments[1];
  
  if (isValidLocale(locale)) {
    return locale;
  }
  
  return defaultLocale;
}

// Remove locale from pathname
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/");
  const locale = segments[1];
  
  if (isValidLocale(locale)) {
    return "/" + segments.slice(2).join("/");
  }
  
  return pathname;
}

// Add locale to pathname
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  if (pathname === "/") {
    return `/${locale}`;
  }
  
  return `/${locale}${pathname}`;
}

// Next-intl configuration
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: "Europe/Kiev",
    now: new Date(),
  };
});
