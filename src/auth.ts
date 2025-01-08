
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    async profile(profile) {
      console.log("profile is called")
      const user = await prisma.user.findUnique({
        where:{
          email:profile.email
        }
      })
      if (user?.id) {
        console.log("user exists in database, get the role");
        // user exists in database
        // get the role in database
        return {
          role: user.role,
          image: profile.picture || profile.avatar_url,
          new_user: false,
          ...profile,
        };
      } else {
        console.log("user not exist in database, assign new role")
        // user doesn't exist in database
        // assign new role
        return {
          role: "USER",
          image: profile.picture || profile.avatar_url,
          new_user: true,
          ...profile,
        };
      }
    },
  })],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    // Relative time from now in seconds when to expire the session
    maxAge: 2592000, // 30 days
    // if using adapter , will default to database
    strategy: "jwt",
    // how often the session should be updated in second
    updateAge: 86400, // 1 day
  },
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session callback is called")
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async signIn({ user, account }) {
      console.log("signIn callback is called")
      if (account?.provider === "google") {
        console.log("creating or updating user database")
        try {
          // Null/undefined checks are important
          const userEmail = user.email;
          if (!userEmail) {
            console.log("email not found")
            return false;
          }

          if (user.new_user) {
            await prisma.user.create({
              data:{
                email:userEmail,
                profile_picture:user.image,
                name:user.name
              }
            })
            console.log(`user with email ${userEmail} is created`)
            return true;
          } else {
            console.log("user database already exists")
            return true;
          }
        } catch (error) {
          console.error("error signin google", error)
          return false;
        }
      }
      return true;
    },
  }
})