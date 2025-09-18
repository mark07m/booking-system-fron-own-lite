// i18n providers for client and server components

"use client";

import { NextIntlClientProvider } from "next-intl";
import { useTheme } from "@booking-system/ui";
import { ThemeProvider } from "@booking-system/ui";
import { useLocale } from "next-intl";
import { useMemo } from "react";

interface I18nProviderProps {
  children: React.ReactNode;
  messages: Record<string, any>;
  locale: string;
}

export function I18nProvider({ children, messages, locale }: I18nProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

// Combined theme and i18n provider
export function AppProviders({ children, messages, locale }: I18nProviderProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="booking-system-theme">
      <I18nProvider messages={messages} locale={locale}>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}

// Hook for getting localized messages
export function useLocalizedMessages() {
  const locale = useLocale();
  const { theme } = useTheme();
  
  return useMemo(() => ({
    locale,
    theme,
    isRTL: false, // Add RTL support if needed
  }), [locale, theme]);
}
