import Link from "next/link";

export default async function Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
        Deezer Stats
      </h1>
      <p className="text-center text-lg font-semibold leading-tight">
        Authenticate with Deezer below.
      </p>
      <br />
      <Link href="/api/connect">
        <button className="btn">Login with Deezer</button>
      </Link>
    </main>
  );
}
