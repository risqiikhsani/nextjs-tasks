import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        const { email, name } = user;
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: email as string },
          });

          if (!existingUser) {
            // Create a new user if they don't exist
            await prisma.user.create({
              data: {
                email: email as string,
                name: name || "",
                username: email?.split("@")[0] || "", // Generate a username from email
                password: "", // OAuth users don't have a password
              },
            });
          } else {
            // Update existing user's information if needed
            await prisma.user.update({
              where: { email: email as string },
              data: {
                name: name || existingUser.name,
              },
            });
          }
        } catch (error) {
          console.error("Error saving user to database:", error);
          return false;
        }
      }
      return true;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
};