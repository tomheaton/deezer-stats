import { musicSchema } from "@/utils/types";

export default async function getHistory(token?: string) {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/history");
  url.searchParams.set("access_token", token);
  // url.searchParams.set("limit", "100");
  // url.searchParams.set("order", "DESC");

  // start_date=2022-01-01&end_date=2022-01-31

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

  // TODO: handle pagination
  let _data: any = [...data.data];

  if (data.next) {
    console.log("NEXT");
    const response = await fetch(url);
    const newData = await response.json();
    _data = [..._data, ...newData.data];
    if (newData.next) {
      console.log("NEXT AGAIN");
      const response = await fetch(url);
      const newData = await response.json();
      _data = [..._data, ...newData.data];
      if (newData.next) {
        console.log("NEXT AGAIN AGAIN");
        const response = await fetch(url);
        const newData = await response.json();
        _data = [..._data, ...newData.data];
      }
    }
  }

  return {
    success: true,
    data: _data.flatMap((m: unknown) => {
      const music = musicSchema.safeParse(m);
      return music.success ? music.data : [];
    }),
  };
}
