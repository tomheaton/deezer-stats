import MusicChart from "@/components/music_chart";
import getHistory from "@/fetchers/getHistory";
import { TEXT_SIZES, getTopTenArtists } from "@/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "history | deezer-stats",
};

// TODO: add range query
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const { token } = searchParams || {};

  const history = await getHistory(token);

  const topArtists = getTopTenArtists(history.data ?? []);

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
            History ({history.data?.length ?? "none"})
          </h2>
          <MusicChart
            labels={topArtists.map((a) => a.name)}
            label={"Play Count"}
            data={topArtists.map((a) => a.playCount)}
          />
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
                  className={`${TEXT_SIZES[index]} text-center`}
                >
                  {artist.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
