import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for hosting on static platforms
  // Uncomment if deploying to GitHub Pages, Cloudflare Pages (static), etc.
  // output: "export",

  // Image optimization
  images: {
    unoptimized: false,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
