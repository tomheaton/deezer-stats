import MusicCard from "@/components/music_card";
import getFavourites from "@/fetchers/getFavourites";
import getHistory from "@/fetchers/getHistory";
import type { MusicType } from "@/utils/types";
import type { Metadata } from "next";
import Link from "next/link";

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

  const history = await getHistory(token);
  const favourites = await getFavourites(token);

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
              history.data?.slice(0, 100).map((track: MusicType) => (
                <a
                  href={track.link}
                  key={track.id}
                  target="_blank"
                  rel="external noreferrer"
                >
                  <MusicCard music={track} />
                </a>
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
              favourites.data?.slice(0, 100).map((track: MusicType) => (
                <a
                  href={track.link}
                  key={track.id}
                  target="_blank"
                  rel="external noreferrer"
                >
                  <MusicCard music={track} />
                </a>
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
