import { prisma } from "@/prisma/client";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the default NextAuth session type to include our custom user properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
    };
  }
}

// NextAuth configuration options
const authOptions: NextAuthOptions = {
  providers: [
    // Configure credentials provider for username/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Validate user credentials against database
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        // Return null if user not found
        if (!user) {
          return null;
        }

        // Verify password
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        // Return null if password is invalid
        if (!isPasswordValid) {
          return null;
        }

        // Return user data if credentials are valid
        return {
          id: user.id.toString(),
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  // Use JWT for session management
  session: {
    strategy: "jwt",
  },
  // Custom pages configuration
  pages: {
    signIn: "/login", // Redirect to custom login page
  },
  // JWT and session callbacks
  callbacks: {
    // Add custom user data to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
      }
      return token;
    },
    // Add custom user data to session
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          username: token.username as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
        };
      }
      return session;
    },
  },
};

export default authOptions;
