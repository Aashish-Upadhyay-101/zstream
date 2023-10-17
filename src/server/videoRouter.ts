import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "./trpc";
import { getAllVideos } from "zstream/services/server/video/getAllVideos";
import { z } from "zod";
import {
  getVideoById,
  getVideoComments,
  getVideoDislikesCount,
  getVideoLikesCount,
  videoEngagementAction,
} from "zstream/services/server/video/videoDetail";

export const videoRouter = createTRPCRouter({
  getAllVideos: publicProcedure.query(async () => {
    try {
      return await getAllVideos();
    } catch (error) {
      let message = "Somethings wrong, please try again later";
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message,
      });
    }
  }),

  getVideoById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        viewerId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      try {
        return await getVideoById(id);
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
      }
    }),

  createVideoEngagement: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        userId: z.string(),
        engagementType: z.enum(["VIEW", "LIKE", "DISLIKE", "COMMENT"]),
        comment: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await videoEngagementAction(input);
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
      }
    }),

  getVideoLikesCount: publicProcedure
    .input(
      z.object({
        videoId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { videoId } = input;
      try {
        return getVideoLikesCount(videoId);
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
      }
    }),

  getVideoDislikesCount: publicProcedure
    .input(
      z.object({
        videoId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { videoId } = input;
      try {
        return getVideoDislikesCount(videoId);
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
      }
    }),

  getVideoComments: publicProcedure
    .input(
      z.object({
        videoId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { videoId } = input;
      try {
        return getVideoComments(videoId);
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
      }
    }),
});
