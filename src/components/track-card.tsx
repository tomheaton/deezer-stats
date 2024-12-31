import type { Track } from "@/utils/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

export function TrackCard({ track }: { track: Track }) {
  return (
    <a href={track.link} target="_blank" rel="external noreferrer">
      <div className="flex items-center space-x-4 rounded-lg border-2 border-deezer-purple p-4 transition-all hover:scale-105 active:scale-95">
        <Image
          src={track.album.cover_xl}
          alt={track.album.title}
          className="h-16 w-16 rounded-lg"
          width={1000}
          height={1000}
        />
        <div>
          <p className="font-bold tracking-tight">{track.title}</p>
          <p className="text-base">{track.artist.name}</p>
          <p className="text-sm italic">{dayjs().to(dayjs(track.time))}</p>
        </div>
      </div>
    </a>
  );
}
