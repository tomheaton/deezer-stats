import { musicSchema, type Range } from "@/utils/types";

export default async function getFavouritesAll(
  token: string | undefined,
  config?: {
    limit?: number;
    range?: Range;
  },
) {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  let nextUrl = new URL("https://api.deezer.com/user/me/tracks");
  nextUrl.searchParams.set("access_token", token);
  // nextUrl.searchParams.set("limit", "50");
  // url.searchParams.set("limit", limit?.toString() || "100");
  // url.searchParams.set("order", "DESC");
  // url.searchParams.set("order", "ASC");
  // url.searchParams.set("start_date", "2023-03-13");
  // url.searchParams.set("start_date", "2023-04-13");
  // url.searchParams.set("end_date", "2023-04-13");

  let allData: any[] = [];

  let response = await fetch(nextUrl);
  let data = await response.json();

  allData = allData.concat(data.data);
  nextUrl = data.next;

  let count = 0;

  // loop to fetch and append subsequent sets of data until there is no more data to retrieve
  while (nextUrl) {
    count = count + 1;
    // console.log("nextUrl", nextUrl);
    if (allData.length >= (config?.limit ?? 100)) {
      // console.log("limit reached");
      break;
    }
    let response = await fetch(nextUrl);
    let data = await response.json();

    allData = allData.concat(data.data);
    nextUrl = data.next;
  }

  // console.log("count:", count);
  // console.log("data:", allData);
  // console.log("length:", allData.length);

  if (!data || !allData) {
    return {
      success: true,
      data: [],
    };
  }

  let musicData = allData
    .flatMap((m: unknown) => {
      const music = musicSchema.safeParse(m);
      return music.success ? music.data : [];
    })
    .reverse();

  if (config?.range) {
    if (config.range === "short_term") {
      musicData = musicData.filter((m) => {
        const date = new Date(m.time_add);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays <= 28;
      });
    } else if (config.range === "medium_term") {
      musicData = musicData.filter((m) => {
        const date = new Date(m.time_add);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays <= 180;
      });
    }
  }

  return {
    success: true,
    data: musicData,
  };
}
