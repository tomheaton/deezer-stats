import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page(props: {
  searchParams?: Promise<{
    token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { token } = searchParams || {};

  if (!token) {
    return redirect("/");
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-y-4 py-8">
      <Link href="/">
        <h1 className="font-extrabold text-5xl leading-none tracking-tighter transition-all hover:scale-105 active:scale-95">
          Deezer Stats
        </h1>
      </Link>
      <p className="text-center font-semibold text-lg leading-tight">
        View your history and favourites below.
      </p>
      <div className="space-x-2">
        <Link href={`/history?token=${token}`}>
          <button type="button" className="btn">
            History
          </button>
        </Link>
        <Link href={`/favourites?token=${token}`}>
          <button type="button" className="btn">
            Favourites
          </button>
        </Link>
        <Link href={`/overview?token=${token}`}>
          <button type="button" className="btn">
            Overview
          </button>
        </Link>
      </div>
    </main>
  );
}
