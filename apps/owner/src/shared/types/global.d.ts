// Global type declarations

declare global {
  interface Window {
    // Add any global window properties here
  }
}

// Extend Next.js types if needed
declare module "next" {
  interface NextPageProps {
    // Add custom page props here
  }
}

export {};
