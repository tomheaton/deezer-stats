import Link from "next/link";

export default async function Page() {
  return (
    <main className="mx-auto py-8 min-h-screen container flex flex-col items-center justify-center">
      <h1 className="font-extrabold tracking-tighter text-5xl mb-2">
        deezer-stats
      </h1>
      <p>view your deezer stats</p>
      <br />
      <Link href="/connect">
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all">
          Login with Deezer
        </button>
      </Link>
    </main>
  );
}
