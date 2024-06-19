import { NextAuthOptions } from "next-auth";

import nextAuth from "next-auth";
import NextAuth from "next-auth/next";

import GoogleaProvider from "next-auth/providers/google"

const authOptions:NextAuthOptions={
    session:{
        strategy:'jwt'
    },
    providers:[
        GoogleaProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!

        })
    ],
    callbacks:{
        async signIn({account,profile}){
            console.log(profile)

            return true
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
          }
    },
}


const handler = NextAuth(authOptions)

export {handler as GET ,handler as POST}