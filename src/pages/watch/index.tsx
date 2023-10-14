import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import VideoPlayer from "zstream/ui/components/video/video-player";

export default function Watch({}) {
  return <VideoPlayer />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query as { id: string };
  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
