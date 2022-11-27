import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "../../../lib/prisma";

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
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
});
