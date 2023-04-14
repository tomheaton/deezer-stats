"use client";

import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  pathname: Route;
  token: string;
};

export default function Header({ pathname, token }: Props) {
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
    <Link href={(pathname + "?" + createQueryString("token", token)) as Route}>
      <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
        Deezer Stats
      </h1>
    </Link>
  );
}
