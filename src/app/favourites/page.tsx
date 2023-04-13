import MusicChart from "@/components/music_chart";
import getFavouritesAll from "@/fetchers/getFavouritesAll";
import { getTopTenArtists } from "@/utils";
import type { Metadata } from "next";
import Link from "next/link";

const textSizes = [
  // "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
  "text-7xl",
  // "text-8xl",
  // "text-9xl",
].reverse();

export const metadata: Metadata = {
  title: "favourites | deezer-stats",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const { token } = searchParams || {};

  // const favourites = await getFavourites(token);
  const favourites = await getFavouritesAll(token, 10_000);

  const topArtists = getTopTenArtists(favourites.data ?? []);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
          deezer-stats
        </h1>
      </Link>
      <div className={"flex w-full flex-wrap justify-evenly"}>
        <div className="w-full p-4 md:w-1/3">
          <h2 className="mb-2 text-2xl font-bold tracking-tighter">
            Favourite Tracks ({favourites.data?.length ?? "none"})
          </h2>
          <MusicChart
            labels={topArtists.map((a) => a.name)}
            label={"Top Ten Artists"}
            data={topArtists.map((a) => a.playCount)}
          />
          {/* <div className="flex flex-col space-y-1">
            {favourites.success &&
              favourites.data
                ?.slice(0, 100)
                .map((track: MusicType) => (
                  <MusicCard key={track.id} music={track} />
                ))}
          </div> */}
        </div>
        <div className="w-full p-4 md:w-1/3">
          <h2 className="mb-2 text-2xl font-bold tracking-tighter">
            Top Ten Artists
          </h2>
          <div className="flex flex-col space-y-1">
            <ol>
              {topArtists.map((artist, index) => (
                <li
                  key={artist.id}
                  className={`${textSizes[index]} text-center`}
                >
                  {artist.name}
                </li>
              ))}
              {/* {topArtists.map((artist, index) => (
                <li key={artist.id} className="text-lg">
                  {index + 1}. {artist.name}
                </li>
              ))} */}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
