import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default async function Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-y-4 py-8">
      <Link href="/">
        <h1 className="font-extrabold text-5xl leading-none tracking-tighter transition-all hover:scale-105 active:scale-95">
          Terms of Use
        </h1>
      </Link>
      <ul className="list-disc font-semibold text-lg leading-tight">
        <li>This website is not affiliated with Deezer.</li>
        <li>This website makes use of the Deezer API.</li>
        <li>This website does not store any data.</li>
      </ul>
    </main>
  );
}
