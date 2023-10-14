import { TbLoader3 } from "react-icons/tb";
import { api } from "zstream/utils/api";
import RecommendationVideoCard from "./recommendation-video-card";

export default function VideoRecommendationBar() {
  const { data: videos, isLoading } = api.video.getAllVideos.useQuery();

  return (
    <div className="ml-8">
      {isLoading && (
        <div className="ml-8 flex h-screen flex-grow items-center justify-center">
          <TbLoader3 className="animate-spin text-5xl" />
        </div>
      )}

      <div className="flex max-w-xl flex-col gap-4">
        {videos?.map((video) => (
          <RecommendationVideoCard
            key={video.id}
            id={video.id}
            creator={video.user.name}
            title={video.title}
            videoUrl={video.videoUrl}
            createdAt={video.createdAt}
            updatedAt={video.updatedAt}
            thumbnailUrl={video.thumbnailUrl!}
            published={video.published}
            viewCount={video._count.videoEngagement}
          />
        ))}
      </div>
    </div>
  );
}