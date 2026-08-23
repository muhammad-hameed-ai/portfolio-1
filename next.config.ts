import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow the Image component to display uploads served through our
    // dynamic API route (/api/uploads/*).  Without this Next.js blocks
    // images whose src doesn't match a known static path or remote pattern.
    remotePatterns: [],
  },
};

export default nextConfig;
