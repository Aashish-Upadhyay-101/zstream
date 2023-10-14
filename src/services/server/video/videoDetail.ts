import { db } from "zstream/server/db";

export const getVideoById = async (id: string) => {
  const video = await db.video.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      comment: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!video) {
    throw new Error("Video not found");
  }

  return video;
};
