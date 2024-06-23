import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
import Credentials from "next-auth/providers/credentials";
import Okta from "next-auth/providers/okta";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Auth0 from "next-auth/providers/auth0";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Auth0,
    // Auth0({
    //   //   clientId: process.env.AUTH_AUTH0_ID,
    //   //   clientSecret: process.env.AUTH_AUTH0_SECRET,
    //   //   issuer: process.env.AUTH_AUTH0_ISSUER,
    // }),
  ],
  adapter: MongoDBAdapter(clientPromise),
});
