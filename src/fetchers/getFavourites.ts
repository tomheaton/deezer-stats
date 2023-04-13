import { musicSchema } from "@/utils/types";

export default async function getFavourites(token?: string) {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/tracks");
  url.searchParams.set("access_token", token);
  url.searchParams.set("limit", "100");
  url.searchParams.set("order", "DESC");

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
