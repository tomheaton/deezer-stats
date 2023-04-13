import getFavourites from "@/fetchers/getFavourites";
import getHistory from "@/fetchers/getHistory";
import { getTopTenArtists } from "@/utils";
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
      <div className={"flex w-full justify-evenly"}>
        <div>
          <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
            History
          </h2>
          <ol>
            {getTopTenArtists(history.data ?? []).map((artist) => (
              <li key={artist.id}>
                {artist.name} - {artist.playCount}
              </li>
            ))}
          </ol>
          {history.data ? (
            <>
              <p className="italic leading-tight">
                history: {history.data.length}
              </p>
              <ul>
                {history.data.map((item: any) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>error: {history.error}</p>
          )}
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
            Favourites
          </h2>
          <ol>
            {getTopTenArtists(favourites.data ?? []).map((artist) => (
              <li key={artist.id}>
                {artist.name} - {artist.playCount}
              </li>
            ))}
          </ol>
          {favourites.data ? (
            <>
              <p className="italic leading-tight">
                favourites: {favourites.data.length}
              </p>
              <ul>
                {favourites.data.map((item: any) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>error: {favourites.error}</p>
          )}
        </div>
      </div>
    </main>
  );
}
