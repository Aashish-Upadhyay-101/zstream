import { db } from "zstream/server/db";

export const followEngagement = async (
  creatorId: string,
  currentUserId: string,
) => {
  await db.followEngagement.create({
    data: {
      followingId: creatorId,
      followerId: currentUserId,
      engagementType: "FOLLOW",
    },
  });
};
