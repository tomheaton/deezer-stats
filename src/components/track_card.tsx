import type { Track } from "@/utils/types";
import dayjs from "dayjs";
import Image from "next/image";

dayjs.extend(require("dayjs/plugin/relativeTime"));

type Props = {
  track: Track;
};

export default function TrackCard({ track }: Props) {
  return (
    <div className="flex items-center space-x-2 rounded-lg border-2 border-purple-400 p-4 transition-all hover:scale-105">
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
        {/* @ts-ignore */}
        <p className="text-sm italic">{dayjs().to(dayjs(track.time))}</p>
      </div>
    </div>
  );
}
