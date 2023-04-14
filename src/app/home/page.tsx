import type { Metadata, Route } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home | Deezer Stats",
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
    console.log("no token found (home)");
    redirect("/");
  }

  return (
    <Suspense fallback={<p>loading...</p>}>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
        <Link href="/">
          <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
            Deezer Stats
          </h1>
        </Link>
        <p className="mb-2 text-center text-lg font-semibold leading-tight">
          View your history and favourites below.
        </p>
        <br />
        <div className="space-x-2">
          <Link href={`/history?token=${token}` as Route}>
            <button className="btn">History (beta)</button>
          </Link>
          <Link href={`/favourites?token=${token}` as Route}>
            <button className="btn">Favourites</button>
          </Link>
        </div>
      </main>
    </Suspense>
  );
}
