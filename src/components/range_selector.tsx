"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ranges: { key: string; text: string }[] = [
  { key: "short_term", text: "4 Weeks" },
  { key: "medium_term", text: "6 Months" },
  { key: "long_term", text: "All Time" },
];

type Props = {};

export default function RangeSelector({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
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
    <div className="space-x-2">
      {ranges.map((range) => (
        <button
          key={range.key}
          onClick={() => {
            router.push(
              (pathname + "?" + createQueryString("range", range.key)) as Route,
            );
          }}
          className="btn"
        >
          {range.text}
        </button>
      ))}
    </div>
  );
}
