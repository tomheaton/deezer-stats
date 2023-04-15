import type { MetadataRoute } from "next";

export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://deezer-stats.tomheaton.dev",
    },
    {
      url: "https://deezer-stats.tomheaton.dev/overview",
    },
    {
      url: "https://deezer-stats.tomheaton.dev/favourites",
    },
    {
      url: "https://deezer-stats.tomheaton.dev/history",
    },
    {
      url: "https://deezer-stats.tomheaton.dev/home",
    },
    {
      url: "https://deezer-stats.tomheaton.dev/terms-of-use",
    },
  ];
}
