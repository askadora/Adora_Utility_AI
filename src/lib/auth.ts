// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // const existingUser = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email
        //   }
        // });

        // if (!existingUser) {
        //   throw new Error("User not found");
        // }

        // const passwordMatch = await bcrypt.compare(
        //   credentials.password,
        //   existingUser.password
        // );

        // if (!passwordMatch) {
        //   throw new Error("Invalid password");
        // }

        // await prisma.account.create({
        //   data: {
        //     userId: existingUser.id,
        //     type: "credentials",
        //     provider: "credentials",
        //     providerAccountId: existingUser.id,
        //   },
        // });

        return {
          id: "1",
          email: credentials.email,
          name: "Test User",
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
  },
}; 