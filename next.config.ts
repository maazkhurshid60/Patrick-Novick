import type { NextConfig } from "next";

// 301 redirects for legacy URLs from the old WordPress site, indexed by
// Google, so crawlers don't land on a 404.
async function redirects() {
  return [
    { source: "/work", destination: "/", permanent: true },
    { source: "/feed", destination: "/", permanent: true },
  ];
}

const nextConfig: NextConfig = {
  // Allow better-sqlite3 (native module) to be bundled for server routes
  serverExternalPackages: ["better-sqlite3"],
  redirects,
};

export default nextConfig;
