import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  User,
  Session,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "zstream/server/db";
import { ErrorCode } from "zstream/services/auth/ErrorCode";
import { getUserByEmail } from "zstream/services/server/user/getUserByEmail";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, _req) => {
        if (!credentials) {
          throw new Error(ErrorCode.CREDENTIALS_NOT_FOUND);
        }

        const { email, password } = credentials;

        const user = await getUserByEmail(email).catch(() => {
          throw new Error(ErrorCode.INCORRECT_EMAIL_PASSWORD);
        });

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error(ErrorCode.INCORRECT_EMAIL_PASSWORD);
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        } satisfies User;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!token.email) {
        throw new Error("No email in token");
      }

      const retrievedUser = await db.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (!retrievedUser) {
        return {
          ...token,
          id: user.id,
        };
      }

      return {
        id: retrievedUser.id,
        name: retrievedUser.name,
        email: retrievedUser.email,
      };
    },
    session: ({ session, token }) => {
      if (token && token.email) {
        return {
          ...session,
          user: {
            id: token.id as string,
            name: token.name,
            email: token.email,
          },
        } satisfies Session;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 24 * 30 * 30, // 30 days
  },
  cookies: {
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
        httpOnly: false,
      },
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
