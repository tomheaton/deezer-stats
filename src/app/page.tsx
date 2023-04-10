import Link from "next/link";

export default async function Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
        deezer-stats
      </h1>
      <p className="leading-tight">view your deezer stats</p>
      <br />
      <Link href="/connect">
        <button className="rounded-lg bg-purple-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-purple-700">
          Login with Deezer
        </button>
      </Link>
    </main>
  );
}
