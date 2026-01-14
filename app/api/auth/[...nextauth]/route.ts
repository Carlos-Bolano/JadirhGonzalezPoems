import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/mongoose";
import User from "../../../../models/user";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const userFound = await User.findOne({
            email: credentials?.email,
          }).select("+password");

          if (!userFound) return null;

          const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);

          if (!passwordMatch) return null;

          return userFound;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sing-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
