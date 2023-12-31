import { createTRPCRouter } from "zstream/server/trpc";
import { authRouter } from "./authRouter";
import { videoRouter } from "./videoRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  video: videoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
