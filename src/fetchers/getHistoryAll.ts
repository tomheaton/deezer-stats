import { musicSchema } from "@/utils/types";

export default async function getHistoryAll(
  token?: string,
  limit: number = 1000,
) {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  let nextUrl = new URL("https://api.deezer.com/user/me/history");
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
    console.log("nextUrl", nextUrl);
    if (allData.length >= limit) {
      console.log("limit reached");
      break;
    }
    let response = await fetch(nextUrl);
    let data = await response.json();

    allData = allData.concat(data.data);
    nextUrl = data.next;
  }

  console.log("count:", count);
  // console.log("data:", allData);
  console.log("length:", allData.length);

  if (!data || !allData) {
    return {
      success: true,
      data: [],
    };
  }

  return {
    success: true,
    data: allData.flatMap((m: unknown) => {
      const music = musicSchema.safeParse(m);
      return music.success ? music.data : [];
    }),
  };
}
