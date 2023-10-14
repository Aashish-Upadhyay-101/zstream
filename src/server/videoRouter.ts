import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "./trpc";
import { getAllVideos } from "zstream/services/server/getAllVideos";

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
});
