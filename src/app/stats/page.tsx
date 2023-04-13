import MusicCard from "@/components/music_card";
import getFavouritesAll from "@/fetchers/getFavouritesAll";
import getHistoryAll from "@/fetchers/getHistoryAll";
import type { MusicType } from "@/utils/types";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";

dayjs.extend(require("dayjs/plugin/relativeTime"));

export const metadata: Metadata = {
  title: "stats | deezer-stats",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const { token } = searchParams || {};

  // const history = await getHistory(token);
  const history = await getHistoryAll(token);

  // const favourites = await getFavourites(token);
  const favourites = await getFavouritesAll(token, { limit: 1_000 });

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
          deezer-stats
        </h1>
      </Link>
      <div className={"flex w-full flex-wrap-reverse justify-evenly"}>
        <div className="w-full p-4 md:w-1/3">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
            History ({history.data?.length ?? "none"})
          </h2>
          <div className="flex flex-col space-y-1">
            {history.success ? (
              history.data
                ?.slice(0, 100)
                .map((track: MusicType) => (
                  <MusicCard key={track.id} music={track} />
                ))
            ) : (
              <p>error: {history.error}</p>
            )}
          </div>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
            Favourites ({favourites.data?.length ?? "none"})
          </h2>
          <div className="flex flex-col space-y-1">
            {favourites.success ? (
              favourites.data
                ?.slice(0, 100)
                .map((track: MusicType) => (
                  <MusicCard key={track.id} music={track} />
                ))
            ) : (
              <p>error: {favourites.error}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
