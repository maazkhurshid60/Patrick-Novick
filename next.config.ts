import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow better-sqlite3 (native module) to be bundled for server routes
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
