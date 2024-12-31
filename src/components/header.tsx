"use client";

import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function Header({
  pathname,
  token,
}: {
  pathname: Route;
  token: string;
}) {
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Link href={`${pathname}?${createQueryString("token", token)}`}>
      <h1 className="leading-none text-5xl font-extrabold tracking-tighter transition-all hover:scale-105 active:scale-95">
        Deezer Stats
      </h1>
    </Link>
  );
}
