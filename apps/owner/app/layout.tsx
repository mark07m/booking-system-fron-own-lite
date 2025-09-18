import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/app-shell/AppShell";
import { EnvErrorBoundary } from "@/shared/components/EnvErrorBoundary";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { Providers } from "@/shared/providers/Providers";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Booking System - Owner",
    template: "%s | Booking System"
  },
  description: "Система управления бронированием для администраторов",
  keywords: ["бронирование", "администратор", "управление", "календарь"],
  authors: [{ name: "Booking System Team" }],
  creator: "Booking System",
  publisher: "Booking System",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    title: "Booking System - Owner",
    description: "Система управления бронированием для администраторов",
    siteName: "Booking System",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking System - Owner",
    description: "Система управления бронированием для администраторов",
  },
  robots: {
    index: false, // Admin panel should not be indexed
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <EnvErrorBoundary>
            <ErrorBoundary>
              <AppShell>{children}</AppShell>
            </ErrorBoundary>
          </EnvErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
