import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdn.jsdelivr.net",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
