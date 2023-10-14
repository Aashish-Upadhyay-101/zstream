import { db } from "zstream/server/db";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUniqueOrThrow({
    where: {
      email: email.toLowerCase(),
    },
  });
};
