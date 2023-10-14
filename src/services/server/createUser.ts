import { db } from "zstream/server/db";
import { hash } from "bcrypt";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: ICreateUser) => {
  const userExists = await db.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 12); // SLAT_ROUND = 12

  return db.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });
};
