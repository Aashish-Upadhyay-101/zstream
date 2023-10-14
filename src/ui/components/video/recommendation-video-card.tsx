import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

interface RecommendationVideoCardProps {
  id: string;
  creator: string;
  title: string;
  thumbnailUrl?: string;
  videoUrl: string;
  published?: boolean;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
}

export default function RecommendationVideoCard({
  id,
  creator,
  title,
  thumbnailUrl,
  viewCount,
  createdAt,
}: RecommendationVideoCardProps) {
  return (
    <Link
      href={`/watch?id=${id}`}
      className="flex max-w-[40] cursor-pointer gap-2 overflow-hidden rounded-md border"
    >
      <Image src={thumbnailUrl!} alt="thumbnail" width={200} height={200} />
      <div className="p-3">
        <h3 className="font-semibold">{title}</h3>
        <h3 className="mt-2 text-xs font-semibold">{creator}</h3>
        <div className="mt-1 flex justify-between">
          <span className="text-sm text-secondary-foreground/60">
            {viewCount} views
          </span>
          <span className="text-sm text-secondary-foreground/60">
            {dayjs(createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
}
