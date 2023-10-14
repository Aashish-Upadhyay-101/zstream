import AppLayout from "zstream/layouts/AppLayout";
import { Navbar, Sidebar } from "zstream/ui/components";
import VideoCard from "zstream/ui/components/video/video-card";
import { api } from "zstream/utils/api";

export default function Home() {
  const { data: videos, isLoading, error } = api.video.getAllVideos.useQuery();
  console.log(videos);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <AppLayout>
      <div className="grid gap-12 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {videos?.map((video) => (
          <VideoCard
            key={video.id}
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
    </AppLayout>
  );
}
