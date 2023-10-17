import { useState } from "react";
import { Button } from "zstream/ui/primitives/button";
import { BiSave } from "react-icons/bi";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useRouter } from "next/router";
import { api } from "zstream/utils/api";
import { useSession } from "next-auth/react";
import { TRPCClientError } from "@trpc/client";

interface VideoDescriptionProps {
  title: string;
  creator: string;
  description: string;
  views: number;
}

export default function VideoDescription({
  title,
  creator,
  description,
  views,
}: VideoDescriptionProps) {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { data: session } = useSession();
  const userId = session?.user.id!;

  const router = useRouter();
  const { id: videoId } = router.query as { id: string };

  const { data: likes } = api.video.getVideoLikesCount.useQuery({
    videoId,
  });
  const { data: dislikes } = api.video.getVideoDislikesCount.useQuery({
    videoId,
  });
  const { mutateAsync: createEngagement } =
    api.video.createVideoEngagement.useMutation();
  const handleCreateEngagement = async (engagementType: "LIKE" | "DISLIKE") => {
    try {
      await createEngagement({
        engagementType,
        userId,
        videoId,
      });

      // update likes and dislikes
    } catch (error) {
      if (
        error instanceof TRPCClientError &&
        error.shape?.message == "UNAUTHORIZED"
      ) {
        return router.push(`/auth/signin?next=/watch?id=${videoId}`);
      }
    }
  };

  return (
    <div className="mr-6 mt-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-secondary-foreground/70">{views} views</p>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold">{creator}</h3>
          <Button>Subscribe</Button>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex flex-col items-center"
            onClick={() => {
              handleCreateEngagement("LIKE");
            }}
          >
            <AiOutlineLike className="h-7 w-7" />
            <span className="text-xs font-semibold">{likes}</span>
          </button>
          <button
            className="flex flex-col items-center"
            onClick={() => {
              handleCreateEngagement("DISLIKE");
            }}
          >
            <AiOutlineDislike className="h-7 w-7" />
            <span className="text-xs font-semibold">{dislikes}</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border border-primary/70 p-2 duration-200 hover:bg-primary/20"
            onClick={() => {}}
          >
            <BiSave className="h-7 w-7 text-primary" /> Save
          </button>
        </div>
      </div>
      <div className={`mt-4 ${!showMore && "line-clamp-2"}`}>{description}</div>
      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-1 text-primary"
      >
        {showMore ? "show less" : "show more..."}
      </button>
    </div>
  );
}
