import { db } from "zstream/server/db";

export const getVideoById = async (id: string) => {
  const video = await db.video.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      _count: {
        select: {
          videoEngagement: {
            where: {
              engagementType: "VIEW",
            },
          },
        },
      },
    },
  });

  if (!video) {
    throw new Error("Video not found");
  }

  return video;
};

export const getVideoLikesCount = async (videoId: string) => {
  const likes = await db.videoEngagement.findMany({
    where: {
      videoId: videoId,
      engagementType: "LIKE",
    },
  });
  if (!likes) {
    throw new Error("Unable to count video likes at the moment");
  }
  return likes.length;
};

export const getVideoDislikesCount = async (videoId: string) => {
  const dislikes = await db.videoEngagement.findMany({
    where: {
      videoId: videoId,
      engagementType: "DISLIKE",
    },
  });
  if (!dislikes) {
    throw new Error("Unable to count video dislikes at the moment");
  }
  return dislikes.length;
};

export const getVideoComments = async (videoId: string) => {
  const comments = await db.comment.findMany({
    where: {
      videoId: videoId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!comments) {
    throw new Error("Unable to fetch comments at the moment");
  }
  return comments;
};

export const videoEngagementAction = async ({
  videoId,
  userId,
  engagementType,
  comment,
}: {
  videoId: string;
  userId: string;
  engagementType: string;
  comment?: string;
}) => {
  if (engagementType === "VIEW") {
    await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        videoEngagement: {
          create: {
            engagementType: "VIEW",
            userId: userId,
          },
        },
      },
    });
  } else if (engagementType === "LIKE") {
    const disliked = await db.videoEngagement.findFirst({
      where: {
        videoId: videoId,
        userId: userId,
        engagementType: "DISLIKE",
      },
    });

    if (disliked) {
      // remove like
      await db.videoEngagement.deleteMany({
        where: {
          id: disliked.id,
        },
      });
    }

    // check if user already liked a video
    const engagement = await db.videoEngagement.findFirst({
      where: {
        videoId: videoId,
        userId: userId,
        engagementType: "LIKE",
      },
    });

    if (engagement) {
      // remove like
      await db.videoEngagement.deleteMany({
        where: {
          id: engagement.id,
        },
      });
    } else {
      // give a like
      await db.video.update({
        where: {
          id: videoId,
        },
        data: {
          videoEngagement: {
            create: {
              engagementType: "LIKE",
              userId: userId,
            },
          },
        },
      });
    }
  } else if (engagementType === "DISLIKE") {
    const liked = await db.videoEngagement.findFirst({
      where: {
        videoId: videoId,
        userId: userId,
        engagementType: "LIKE",
      },
    });

    if (liked) {
      // remove like
      await db.videoEngagement.deleteMany({
        where: {
          id: liked.id,
        },
      });
    }

    // check if user already disliked a video
    const engagement = await db.videoEngagement.findFirst({
      where: {
        videoId: videoId,
        userId: userId,
        engagementType: "DISLIKE",
      },
    });

    if (engagement) {
      // remove like
      await db.videoEngagement.deleteMany({
        where: {
          id: engagement.id,
        },
      });
    } else {
      // give a like
      await db.video.update({
        where: {
          id: videoId,
        },
        data: {
          videoEngagement: {
            create: {
              engagementType: "DISLIKE",
              userId: userId,
            },
          },
        },
      });
    }
  } else if (engagementType === "COMMENT") {
    await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        videoEngagement: {
          create: {
            engagementType: "COMMENT",
            userId: userId,
          },
        },
        comment: {
          create: {
            userId: userId,
            message: comment || "",
          },
        },
      },
    });
  } else {
    throw new Error("Bad engagement type");
  }
};
