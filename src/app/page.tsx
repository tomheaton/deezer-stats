import Link from "next/link";

export default async function Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
        deezer-stats
      </h1>
      <p className="leading-tight">view your deezer stats</p>
      <br />
      <Link href="/api/connect">
        <button className="btn">Login with Deezer</button>
      </Link>
    </main>
  );
}
