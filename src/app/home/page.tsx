import type { Metadata, Route } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    redirect("/");
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <Link href="/">
        <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
          Deezer Stats
        </h1>
      </Link>
      <p className="mb-2 text-center text-lg font-semibold leading-tight">
        Welcome to Deezer Stats!
        <br />
        You can view your history and favourites below.
      </p>
      <div className="my-2 space-x-2">
        <Link className="btn" href={`/history?token=${token}` as Route}>
          History (beta)
        </Link>
        <Link className="btn" href={`/favourites?token=${token}` as Route}>
          Favourites
        </Link>
      </div>
    </main>
  );
}
