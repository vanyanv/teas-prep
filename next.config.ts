import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't pick up the parent /home/vardan lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Science diagram base images are served from Cloudflare R2. The r2.dev
    // managed domain covers development; add the custom domain here too once
    // one is attached, since remotePatterns is an allowlist and an unlisted
    // host makes next/image throw at runtime rather than degrade.
    remotePatterns: [{ protocol: "https", hostname: "**.r2.dev" }],
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
