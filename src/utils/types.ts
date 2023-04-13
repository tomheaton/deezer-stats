import { z } from "zod";

export const musicSchema = z
  .object({
    id: z.number(),
    type: z.string(),
    title: z.string(),
    // title: z.number(),
    // title_short: z.string(),
    // title_version: z.string(),
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
    // TODO: fix these
    // timestamp for /history
    timestamp: z.number().optional(),
    // time_add for /tracks
    time_add: z.number().optional(),
  })
  .transform((m) => ({
    ...m,
    timestamp: m.timestamp ? new Date(m.timestamp * 1000) : Date.now(),
    time_add: m.time_add ? new Date(m.time_add * 1000) : Date.now(),
  }));

export type MusicType = z.infer<typeof musicSchema>;
