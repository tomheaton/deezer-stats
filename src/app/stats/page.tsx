import TrackCard from "@/components/track_card";
import getFavourites from "@/fetchers/getFavourites";
import getHistory from "@/fetchers/getHistory";
import type { Track } from "@/utils/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stats | Deezer Stats",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const { token } = searchParams || {};

  const history = await getHistory(token);
  const favourites = await getFavourites(token);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
          Deezer Stats
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
                .map((track: Track) => (
                  <TrackCard key={track.id} track={track} />
                ))
            ) : (
              <p>Error: {history.error}</p>
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
                .map((track: Track) => (
                  <TrackCard key={track.id} track={track} />
                ))
            ) : (
              <p>Error: {favourites.error}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
