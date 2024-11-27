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
        // if nore credentials given, return null
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        
        // find user in db
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        // if no user, return null
        if (!user) {
          return null;
        }

        // check the password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // if password wrong, return null
        if (!isPasswordValid) {
          return null;
        }

        // return data
        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
          name: user.name,
        };
      },
    }),
  ],
  // secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        const { email, name } = user;
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: email as string },
          });
          // if there is no user in db
          if (!existingUser) {
            // Create a new user
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

    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      // I skipped the line below coz it gave me a TypeError
      // session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
};
