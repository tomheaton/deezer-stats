import getFavouritesAll from "@/fetchers/getFavouritesAll";
import getHistoryAll from "@/fetchers/getHistoryAll";
import type { MusicType } from "@/utils/types";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";

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
  const favourites = await getFavouritesAll(token, 10000);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
          deezer-stats
        </h1>
      </Link>
      <div className={"flex w-full justify-evenly"}>
        <div className="w-1/3">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
            History ({history.data?.length ?? "none"})
          </h2>
          {history.data ? (
            <ul>
              {history.data.map((item: MusicType) => (
                <li key={item.id}>
                  {/* @ts-ignore */}
                  {item.title} - {dayjs().to(dayjs(item.timestamp))}
                </li>
              ))}
            </ul>
          ) : (
            <p>error: {history.error}</p>
          )}
        </div>
        <div className="w-1/3">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
            Favourites ({favourites.data?.length ?? "none"})
          </h2>
          {favourites.data ? (
            <ul>
              {favourites.data
                .reverse()
                .slice(0, 100)
                .map((item: MusicType) => (
                  <li key={item.id}>
                    {/* @ts-ignore */}
                    {item.title} - {dayjs().to(dayjs(item.time_add))}
                  </li>
                ))}
            </ul>
          ) : (
            <p>error: {favourites.error}</p>
          )}
        </div>
      </div>
    </main>
  );
}
