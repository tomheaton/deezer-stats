import Link from "next/link";

export default async function Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-y-2 py-8">
      <h1 className="font-extrabold text-5xl leading-none tracking-tighter transition-all hover:scale-105 active:scale-95">
        Deezer Stats
      </h1>
      <p className="text-center font-semibold text-lg leading-tight">
        Authenticate with Deezer below.
      </p>
      <Link href="/api/connect">
        <button type="button" className="btn">
          Login with Deezer
        </button>
      </Link>
    </main>
  );
}
