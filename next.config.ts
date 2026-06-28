import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't pick up the parent /home/vardan lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
