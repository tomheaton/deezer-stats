import { musicSchema } from "@/utils/types";

export default async function getHistory(token?: string, limit?: number) {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/history");
  url.searchParams.set("access_token", token);
  url.searchParams.set("limit", limit?.toString() || "100");
  // url.searchParams.set("order", "DESC");
  // url.searchParams.set("order", "ASC");
  // url.searchParams.set("start_date", "2023-03-13");
  // url.searchParams.set("start_date", "2023-04-13");
  // url.searchParams.set("end_date", "2023-04-13");

  const response = await fetch(url);
  const data = await response.json();
  console.log("data", JSON.stringify(data, null, 2));

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
  let _data: any[] = [...data.data];

  const loop = false;
  if (loop && data.next) {
    console.log("NEXT");
    const xResponse = await fetch(url);
    const xData = await xResponse.json();
    _data = [..._data, ...xData.data];
    if (xData.next) {
      console.log("NEXT AGAIN");
      const yResponse = await fetch(xData.next);
      const yData = await yResponse.json();
      _data = [..._data, ...yData.data];
      if (yData.next) {
        console.log("NEXT AGAIN AGAIN");
        const zResponse = await fetch(yData.next);
        const zData = await zResponse.json();
        _data = [..._data, ...zData.data];
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
