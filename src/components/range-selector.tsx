"use client";

import type { Range } from "@/utils/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ranges: { value: Range; text: string }[] = [
  { value: "short_term", text: "4 Weeks" },
  { value: "medium_term", text: "6 Months" },
  { value: "long_term", text: "All Time" },
] as const;

export function RangeSelector() {
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
    <div className="my-2 space-x-4">
      {ranges.map((range) => (
        <Link
          key={range.value}
          href={`${pathname}?${createQueryString("range", range.value)}`}
        >
          <button className="btn">{range.text}</button>
        </Link>
      ))}
    </div>
  );
}
