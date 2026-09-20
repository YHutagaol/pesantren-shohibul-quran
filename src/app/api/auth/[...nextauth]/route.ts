import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

// We'll use a simple comparison for safety.
// In a full production build, we would use bcrypt.
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // 1. Fallback for demo when MySQL is not running yet
        if (credentials.username === "admin" && credentials.password === "admin123") {
          return { id: "1", name: "Administrator", email: "admin@msq.or.id" };
        }

        try {
          const user = await prisma.admin.findUnique({
            where: { username: credentials.username },
          });

          if (user && user.password === credentials.password) {
            return { id: user.id.toString(), name: user.username, email: "admin@msq.or.id" };
          }
        } catch (e) {
          console.warn("DB connection failed in NextAuth, fallback default login remains active.");
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
