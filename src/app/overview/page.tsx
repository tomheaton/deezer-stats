import Header from "@/components/header";
import TrackCard from "@/components/track_card";
import getFavourites from "@/fetchers/getFavourites";
import getHistory from "@/fetchers/getHistory";
import type { Track } from "@/utils/types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const { token } = searchParams || {};

  if (!token) {
    redirect("/");
  }

  const history = await getHistory(token);
  const favourites = await getFavourites(token);

  return (
    <Suspense fallback={<p>loading...</p>}>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
        <Header pathname="/home" token={token} />
        <div className={"flex w-full flex-wrap-reverse justify-evenly"}>
          <div className="w-full p-4 md:w-1/3">
            <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
              History ({history.data?.length.toLocaleString() ?? "none"})
            </h2>
            <div className="flex flex-col space-y-1">
              {history.data ? (
                history.data
                  ?.slice(0, 100)
                  .map((track: Track) => (
                    <TrackCard key={track.id} track={track} />
                  ))
              ) : (
                <p>Error</p>
              )}
            </div>
          </div>
          <div className="w-full p-4 md:w-1/3">
            <h2 className="mb-2 text-2xl font-extrabold tracking-tighter">
              Favourites ({favourites.data?.length.toLocaleString() ?? "none"})
            </h2>
            <div className="flex flex-col space-y-1">
              {favourites.success ? (
                favourites.data
                  ?.slice(0, 100)
                  .map((track: Track) => (
                    <TrackCard key={track.id} track={track} />
                  ))
              ) : (
                <p>Error</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
