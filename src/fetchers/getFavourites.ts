import { musicSchema } from "@/utils/types";

export default async function getFavourites(
  token?: string,
  limit: number = 50,
) {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/tracks");
  url.searchParams.set("access_token", token);
  url.searchParams.set("limit", limit.toString());
  // url.searchParams.set("order", "DURATION_ASC");
  // url.searchParams.set("order", "ASC");
  // url.searchParams.set("order", "DURATION");
  // url.searchParams.set("order", "RANKING");
  // url.searchParams.set("order_desc", "1");
  // url.searchParams.set("time_range", "10d");
  // url.searchParams.set("start_date", "2023-03-13");
  // url.searchParams.set("start_date", "2023-04-13");
  // url.searchParams.set("end_date", "2023-04-13");

  const response = await fetch(url);
  const data = await response.json();
  // console.log("data", JSON.stringify(data, null, 2));

  if (data.error) {
    console.error("error", data.error);
    return {
      success: false,
      error: JSON.stringify(data.error),
    };
  }

  if (!data || !data.data || !data.data.length) {
    return {
      success: true,
      data: [],
    };
  }

  return {
    success: true,
    data: data.data.flatMap((m: unknown) => {
      const music = musicSchema.safeParse(m);
      return music.success ? music.data : [];
    }),
  };
}
