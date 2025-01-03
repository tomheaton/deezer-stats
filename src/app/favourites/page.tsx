import { Header } from "@/components/header";
import { MusicChart } from "@/components/music-chart";
import { RangeSelector } from "@/components/range-selector";
import { getFavourites } from "@/fetchers/favourites";
import { TEXT_SIZES, getTopTenArtists } from "@/utils";
import type { Range } from "@/utils/types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Favourites",
};

export default async function Page(props: {
  searchParams?: Promise<{
    token?: string;
    range?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { token, range } = searchParams || {};

  if (!token) {
    return redirect("/");
  }

  const favourites = await getFavourites(token, {
    limit: 10_000,
    range: range ? (range as Range) : "long_term",
  });

  const topArtists = getTopTenArtists(favourites.data);

  return (
    <Suspense fallback={<p>loading...</p>}>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
        <Header pathname="/home" token={token} />
        <RangeSelector />
        <div className={"flex w-full flex-wrap justify-evenly"}>
          <div className="w-full p-4 md:w-1/3">
            <h2 className="mb-2 text-2xl font-bold tracking-tighter">
              Favourite Tracks (
              {favourites.data?.length.toLocaleString() ?? "none"})
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
                    className={`text-center ${TEXT_SIZES[index]}`}
                  >
                    {artist.name}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
