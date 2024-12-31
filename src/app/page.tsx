import Link from "next/link";

export default async function Page() {
  return (
    <main className="gap-y-2 container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <h1 className="leading-none text-5xl font-extrabold tracking-tighter transition-all hover:scale-105 active:scale-95">
        Deezer Stats
      </h1>
      <p className="text-center text-lg font-semibold leading-tight">
        Authenticate with Deezer below.
      </p>
      <Link href="/api/connect">
        <button className="btn">Login with Deezer</button>
      </Link>
    </main>
  );
}
