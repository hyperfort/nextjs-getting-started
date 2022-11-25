import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "../../../lib/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
          throw new Error("The provided credentials are incorrect.");
        }
        return user;
      },
    }),
  ],
});
