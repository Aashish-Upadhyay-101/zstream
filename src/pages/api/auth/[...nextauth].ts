import NextAuth from "next-auth";

import { authOptions } from "zstream/server/auth";

export default NextAuth(authOptions);
