import type { NextConfig } from "next";

export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
      },
    ],
  },
} satisfies NextConfig;
