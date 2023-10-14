import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
  height: number;
  width: number;
}

export default function VideoPlayer({
  videoUrl,
  height,
  width,
}: VideoPlayerProps) {
  return (
    <ReactPlayer controls={true} url={videoUrl} height={height} width={width} />
  );
}
