"use client";

import type { Range } from "@/utils/types";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ranges: { value: Range; text: string }[] = [
  { value: "short_term", text: "4 Weeks" },
  { value: "medium_term", text: "6 Months" },
  { value: "long_term", text: "All Time" },
];

export default function RangeSelector() {
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
    <div className="my-2 space-x-2">
      {ranges.map((range) => (
        <Link
          key={range.value}
          href={
            (pathname + "?" + createQueryString("range", range.value)) as Route
          }
        >
          <button className="btn">{range.text}</button>
        </Link>
      ))}
    </div>
  );
}
