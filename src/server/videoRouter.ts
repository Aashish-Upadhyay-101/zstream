import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "./trpc";
import { getAllVideos } from "zstream/services/server/video/getAllVideos";
import { z } from "zod";
import { getVideoById } from "zstream/services/server/video/videoDetail";

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
});
