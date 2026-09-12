import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@finessepay/shared"],
  poweredByHeader: false,
  eslint: {
    // Root `pnpm lint` is the source of truth; CI runs it as its own step.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
