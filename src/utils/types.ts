import { z } from "zod";

export const musicSchema = z.object({
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
    name: z.string(),
  }),
  album: z.object({
    cover_xl: z.string().url(),
    title: z.string(),
  }),
});

export type MusicType = z.infer<typeof musicSchema>;
