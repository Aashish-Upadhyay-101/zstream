import { GetServerSideProps } from "next";
import VideoPlayer from "zstream/ui/components/video/video-player";
import { api } from "zstream/utils/api";
import { useRouter } from "next/router";
import { TbLoader3 } from "react-icons/tb";
import AppLayout from "zstream/layouts/AppLayout";

export default function Watch() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  console.log("id:", id);

  const { data: video, isLoading } = api.video.getVideoById.useQuery({ id });
  console.log("video detail: ", video);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <TbLoader3 className="animate-spin text-3xl" />;
      </div>
    );
  }

  return (
    <AppLayout>
      <VideoPlayer videoUrl={video?.videoUrl!} height={500} width={900} />
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
