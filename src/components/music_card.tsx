import type { MusicType } from "@/utils/types";
import Image from "next/image";

type Props = {
  music: MusicType;
};

export default function MusicCard({ music: track }: Props) {
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
        <p className="text-sm">{track.artist.name}</p>
        {/* @ts-ignore */}
        {/* <p>{dayjs().to(dayjs(item.time_add))}</p> */}
      </div>
    </div>
  );
}
