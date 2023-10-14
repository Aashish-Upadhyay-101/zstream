import { db } from "zstream/server/db";

export const getAllVideos = async () => {
  return db.video.findMany({
    where: {
      published: true,
    },
    include: {
      _count: {
        select: {
          videoEngagement: {
            where: {
              engagementType: "VIEW",
            },
          },
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};
