import { GetServerSideProps } from "next";
import VideoPlayer from "zstream/ui/components/video/video-player";
import { api } from "zstream/utils/api";
import { useRouter } from "next/router";
import { TbLoader3 } from "react-icons/tb";
import AppLayout from "zstream/layouts/AppLayout";
import VideoRecommendationBar from "zstream/ui/components/video/video-recommendation";
import VideoDescription from "zstream/ui/components/video/video-description";

export default function Watch() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: video, isLoading } = api.video.getVideoById.useQuery({ id });

  // get comments

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <TbLoader3 className="animate-spin text-3xl" />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="w-[70%]">
        <VideoPlayer videoUrl={video?.videoUrl!} />
        <VideoDescription
          key={video?.id}
          creator={video?.user.name!}
          title={video?.title!}
          description={video?.description!}
          views={video?._count.videoEngagement!}
        />
      </div>
      <VideoRecommendationBar />
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query as { id: string };
  if (!id) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
