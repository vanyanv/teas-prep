import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't pick up the parent /home/vardan lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    // Pre-Clerk auth URLs, kept alive for old bookmarks and emails.
    return [
      { source: "/signin", destination: "/sign-in", permanent: true },
      { source: "/signup", destination: "/sign-up", permanent: true },
    ];
  },
};

export default nextConfig;
