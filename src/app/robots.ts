import type { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    sitemap: "https://deezer-stats.tomheaton.dev/sitemap.xml",
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
