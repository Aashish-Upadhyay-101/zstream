import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <ReactPlayer controls={true} url={videoUrl} height={"50%"} width={"100%"} />
  );
}
