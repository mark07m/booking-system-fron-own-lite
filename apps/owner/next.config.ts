import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile packages from monorepo
  transpilePackages: ["@booking-system/ui", "@booking-system/theme"],

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["@tanstack/react-query", "zustand"],
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // Compression
  compress: true,

  // PoweredByHeader removal
  poweredByHeader: false,
};

export default nextConfig;
