import type { MusicType } from "@/utils/types";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const getUserFavoriteArtists = (history: MusicType[]) => {
  const artistMap: {
    [key: string]: {
      id: number;
      name: string;
      playCount: number;
    };
  } = {};

  history.forEach((track) => {
    const artistId = track.artist.id;
    const artistName = track.artist.name;

    if (!artistMap[artistId]) {
      artistMap[artistId] = {
        id: artistId,
        name: artistName,
        playCount: 0,
      };
    }

    artistMap[artistId].playCount++;
  });

  const sortedArtists = Object.values(artistMap).sort(
    (a, b) => b.playCount - a.playCount,
  );

  return sortedArtists.slice(0, 10);
};
