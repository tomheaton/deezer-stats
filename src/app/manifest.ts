import type { MetadataRoute } from "next";

export default function Manifest(): MetadataRoute.Manifest {
  return {
    name: "Deezer Stats",
    short_name: "Deezer Stats",
    start_url: "https://deezer-stats.tomheaton.dev",
    display: "standalone",
    theme_color: "#a855f7",
  };
}
