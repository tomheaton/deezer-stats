import { trackSchema, type Range } from "@/utils/types";

export default async function getHistory(
  token: string,
  config?: {
    limit?: number;
    range?: Range;
  },
) {
  let nextUrl = new URL("https://api.deezer.com/user/me/history");
  nextUrl.searchParams.set("access_token", token);

  let allData: any[] = [];

  let response = await fetch(nextUrl);
  let data = await response.json();

  allData = allData.concat(data.data);
  nextUrl = data.next;

  let count = 0;

  while (nextUrl) {
    count = count + 1;
    if (allData.length >= (config?.limit ?? 100)) {
      break;
    }
    let response = await fetch(nextUrl);
    let data = await response.json();

    allData = allData.concat(data.data);
    nextUrl = data.next;
  }

  if (!data || !allData) {
    return {
      success: true,
      data: [],
    };
  }

  let trackData = allData.flatMap((t: unknown) => {
    const track = trackSchema.safeParse(t);
    return track.success ? track.data : [];
  });

  if (config?.range) {
    if (config.range === "short_term") {
      trackData = trackData.filter((m) => {
        const date = new Date(m.time);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays <= 28;
      });
    } else if (config.range === "medium_term") {
      trackData = trackData.filter((m) => {
        const date = new Date(m.time);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays <= 180;
      });
    }
  }

  return {
    success: true,
    data: trackData,
  };
}
