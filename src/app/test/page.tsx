import getFavourites from "@/fetchers/getFavourites";
import { getTopTenArtists } from "@/utils";
import { MusicType } from "@/utils/types";
import type { Metadata } from "next";
import Image from "next/image";
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
  title: "test | deezer-stats",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const { token } = searchParams || {};

  const favourites = await getFavourites(token);

  const topArtists = getTopTenArtists(favourites.data ?? []);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
          deezer-stats
        </h1>
      </Link>
      <div className={"flex w-full flex-wrap-reverse justify-evenly"}>
        <div className="w-full p-4 md:w-1/3">
          <h2 className="mb-2 text-2xl font-bold tracking-tighter">
            Favourite Tracks ({favourites.data?.length ?? "none"})
          </h2>
          <div className="flex flex-col space-y-1">
            {favourites.success &&
              favourites.data.map((track: MusicType) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-2 rounded-lg border-2 border-purple-400 p-4 transition-all hover:scale-105"
                >
                  <Image
                    src={track.album.cover_xl}
                    alt={track.album.title}
                    className="h-16 w-16 rounded-lg"
                    width={1000}
                    height={1000}
                  />
                  <div>
                    <p className="font-bold tracking-tight">{track.title}</p>
                    <p className="text-sm">{track.artist.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <h2 className="mb-2 text-2xl font-bold tracking-tighter">
            Top Ten Artists
          </h2>
          <div className="flex flex-col space-y-1">
            <ol>
              {/* {topArtists.map((artist, index) => (
                <li key={artist.id} className={`${textSizes[index]}`}>
                  {artist.name}
                </li>
              ))} */}
              {topArtists.map((artist, index) => (
                <li key={artist.id} className="text-lg">
                  {index + 1}. {artist.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
