import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (err) {
          throw new Error("error in connecting to db");
        }

        if (!email || !password) {
          throw new Error(" invalid data");
        }

        const user = await User.findOne({ email: email });

        if (!email) throw new Error("user doesn't exist");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new Error("username or password is incorrect");

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
