import { trackSchema, type Range } from "@/utils/types";

export async function getHistory(
  token: string,
  config?: {
    limit?: number;
    range?: Range;
  },
) {
  let nextUrl = new URL("https://api.deezer.com/user/me/history");
  nextUrl.searchParams.set("access_token", token);

  let allData: unknown[] = [];

  const response = await fetch(nextUrl);
  const data = await response.json();

  allData = allData.concat(data.data);
  nextUrl = data.next;

  while (nextUrl) {
    if (allData.length >= (config?.limit ?? 100)) {
      break;
    }

    const response = await fetch(nextUrl);
    const data = await response.json();

    allData = allData.concat(data.data);
    nextUrl = data.next;
  }

  if (!data || !allData) {
    return {
      success: true,
      data: [],
    };
  }

  let trackData = allData.flatMap((t) => {
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
