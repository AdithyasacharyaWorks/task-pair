import { NextAuthOptions } from "next-auth";
import { dbId, database, userCollectionId, Query, ID } from "@/backend";
import nextAuth from "next-auth";
import NextAuth from "next-auth/next";

import GoogleaProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleaProvider({
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
            const data2 = await database.createDocument(
              dbId,
              userCollectionId,
              ID.unique(),
              { email: email }
            );
          } catch (err) {
            console.log(err);
            return false;
          }
        }
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
