// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import type { JWT } from "next-auth/jwt";
// import type { Account } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

// const prisma = new PrismaClient();

const handler = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Commented out Prisma queries
          // const existingUser = await prisma.user.findUnique({
          //   where: { email: user.email! },
          // });

          // if (!existingUser) {
          //   await prisma.user.create({
          //     data: {
          //       email: user.email!,
          //       name: user.name!,
          //     },
          //   });
          // }

          // await prisma.account.create({
          //   data: {
          //     userId: existingUser?.id || "",
          //     type: account.type,
          //     provider: account.provider,
          //     providerAccountId: account.providerAccountId,
          //     access_token: account.access_token,
          //     token_type: account.token_type,
          //     scope: account.scope,
          //   },
          // });

          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST }; 