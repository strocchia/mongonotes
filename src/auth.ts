import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
import Auth0 from "next-auth/providers/auth0";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Auth0],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    // callback with database
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
