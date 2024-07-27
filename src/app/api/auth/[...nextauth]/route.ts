// pages/api/auth/[...nextauth].ts
import { NextAuthOptions } from "next-auth";
import { dbId, database, userCollectionId, Query, ID } from "@/backend";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
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
      // if (url.startsWith("/")) return `${baseUrl}${url}`;
      // if (new URL(url).origin === baseUrl) return url;
      return "http://localhost:3000";
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
