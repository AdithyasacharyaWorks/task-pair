import { NextAuthOptions } from "next-auth";
import { dbId, database, userCollectionId, Query, ID } from "@/backend";
import nextAuth from "next-auth";
import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const email = profile?.email || "";
      try {
        const data = await database.listDocuments(dbId, userCollectionId, [
          Query.equal("email", email),
        ]);
        if (data.total === 0) {
          try {
            await database.createDocument(
              dbId,
              userCollectionId,
              ID.unique(),
              { email: email }
            );
          } catch (err) {
            return false;
          }
        }
      } catch (err) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      const targetUrl = "https://task-pair-1.netlify.app";
      if (url.startsWith("/")) return `${targetUrl}${url}`;
      if (new URL(url).origin === targetUrl) return url;
      return targetUrl;
    },
  },
  pages: {
    signIn: "https://task-pair-1.netlify.app/auth/signin",
    signOut: "https://task-pair-1.netlify.app",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
