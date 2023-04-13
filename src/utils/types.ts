import { z } from "zod";

export const musicSchema = z
  .object({
    id: z.number(),
    type: z.string(),
    title: z.string(),
    // title: z.number(),
    // title_short: z.string(),
    // title_version: z.string(),
    link: z.string().url(),
    duration: z.number(),
    // rank: z.number(),
    // https://cdns-preview-6.dzcdn.net/stream/c-6430575d1f202af381f403b4752438af-6.mp3
    // preview: z.string().url(),
    artist: z.object({
      id: z.number(),
      name: z.string(),
    }),
    album: z.object({
      cover_xl: z.string().url(),
      title: z.string(),
    }),
    // timestamp for /history
    timestamp: z.number().optional(),
    // time_add for /tracks
    time_add: z.number().optional(),
  })
  .transform((m) => {
    let time: Date;

    if (m.timestamp) {
      time = new Date(m.timestamp * 1000);
    } else if (m.time_add) {
      time = new Date(m.time_add * 1000);
    } else {
      time = new Date();
    }

    return {
      ...m,
      time: time,
    };
  });

export type MusicType = z.infer<typeof musicSchema>;

export type Range = "short_term" | "medium_term" | "long_term";
