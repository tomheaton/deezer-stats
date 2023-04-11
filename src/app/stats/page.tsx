import { musicSchema } from "@/utils/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "stats | deezer-stats",
};

type Props = {
  searchParams?: {
    token?: string;
  };
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
  // console.log("data", data);

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

const getFavourites = async (token?: string) => {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/tracks");
  url.searchParams.set("access_token", token);

  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);

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

export default async function Page({ searchParams }: Props) {
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
