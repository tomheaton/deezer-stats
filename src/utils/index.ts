import type { Track } from "@/utils/types";

export function getTopTenArtists(tracks: Track[]) {
  const artistMap: Record<
    string,
    {
      id: number;
      name: string;
      playCount: number;
    }
  > = {};

  tracks.forEach((track) => {
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
}

export const TEXT_SIZES = [
  // "text-9xl",
  // "text-8xl",
  // "text-7xl",
  "text-6xl",
  "text-5xl",
  "text-4xl",
  "text-3xl",
  "text-2xl",
  "text-xl",
  "text-lg",
  "text-base",
  "text-sm",
  "text-xs",
] as const;
