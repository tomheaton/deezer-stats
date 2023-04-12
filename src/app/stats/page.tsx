import { getUserFavoriteArtists } from "@/utils";
import { musicSchema } from "@/utils/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "stats | deezer-stats",
};

const getHistory = async (token?: string) => {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/history");
  url.searchParams.set("access_token", token);

  const response = await fetch(url);
  const data = await response.json();
  // console.log("data", JSON.stringify(data, null, 2));

  if (data.error) {
    console.error("error", data.error);
    return {
      success: false,
      error: JSON.stringify(data.error),
    };
  }

  if (!data || !data.data || !data.data.length) {
    return {
      success: true,
      data: [],
    };
  }

  let _data: any = [...data.data];

  if (data.next) {
    console.log("NEXT");
    const response = await fetch(url);
    const newData = await response.json();
    _data = [..._data, ...newData.data];
    if (newData.next) {
      console.log("NEXT AGAIN");
      const response = await fetch(url);
      const newData = await response.json();
      _data = [..._data, ...newData.data];
      if (newData.next) {
        console.log("NEXT AGAIN AGAIN");
        const response = await fetch(url);
        const newData = await response.json();
        _data = [..._data, ...newData.data];
      }
    }
  }

  return {
    success: true,
    data: _data.flatMap((m: unknown) => {
      const music = musicSchema.safeParse(m);
      return music.success ? music.data : [];
    }),
  };
};

const getFavourites = async (token?: string) => {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/tracks");
  url.searchParams.set("access_token", token);
  url.searchParams.set("order", "DESC");

  const response = await fetch(url);
  const data = await response.json();
  // console.log("data", JSON.stringify(data, null, 2));

  if (data.error) {
    console.error("error", data.error);
    return {
      success: false,
      error: JSON.stringify(data.error),
    };
  }

  if (!data || !data.data || !data.data.length) {
    return {
      success: true,
      data: [],
    };
  }

  return {
    success: true,
    data: data.data.flatMap((m: unknown) => {
      const music = musicSchema.safeParse(m);
      return music.success ? music.data : [];
    }),
  };
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
            {getUserFavoriteArtists(history.data ?? []).map((artist) => (
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
            {getUserFavoriteArtists(favourites.data ?? []).map((artist) => (
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
