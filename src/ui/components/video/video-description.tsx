import { useState } from "react";
import { Button } from "zstream/ui/primitives/button";
import { BiSave } from "react-icons/bi";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

interface VideoDescriptionProps {
  title: string;
  creator: string;
  description: string;
}

export default function VideoDescription({
  title,
  creator,
  description,
}: VideoDescriptionProps) {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div className="mr-6 mt-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-secondary-foreground/70">233 views</p>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold">{creator}</h3>
          <Button>Subscribe</Button>
        </div>
        <div className="flex items-center gap-4">
          <button>
            <AiOutlineLike className="h-7 w-7" />
          </button>
          <button>
            <AiOutlineDislike className="h-7 w-7" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-primary/70 p-2 duration-200 hover:bg-primary/20">
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
