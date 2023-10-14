import { z } from "zod";
import { createUser } from "zstream/services/server/createUser";
import { createTRPCRouter, publicProcedure } from "./trpc";
import { TRPCError } from "@trpc/server";

export const ZSignUpMutationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(ZSignUpMutationSchema)
    .mutation(async ({ input }) => {
      try {
        const { name, email, password } = input;

        return await createUser({ name, email, password });
      } catch (error) {
        let message =
          "We are unable to create you account, please check the information that you've provided";

        if (error instanceof Error && error.message === "User already exists") {
          message =
            "User with this email already exists, please use another email address";
        }

        throw new TRPCError({
          code: "BAD_REQUEST",
          message,
        });
      }
    }),
});
