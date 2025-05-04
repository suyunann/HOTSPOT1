import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DefaultSession } from 'next-auth';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Here we would normally query your database to validate credentials
        // But for now, let's just use a mock user
        if (credentials?.email === 'test@example.com' && credentials?.password === 'password') {
          return {
            id: '1',
            name: '測試用戶',
            email: 'test@example.com',
            image: '/default-avatar.png',
            isPremium: true
          };
        }
        
        if (credentials?.email === 'free@example.com' && credentials?.password === 'password') {
          return {
            id: '2',
            name: '免費用戶',
            email: 'free@example.com',
            image: '/default-avatar.png',
            isPremium: false
          };
        }
        
        // If authentication fails
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add custom user properties to token
      if (user) {
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom token properties to session
      if (session.user) {
        session.user.isPremium = token.isPremium;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
});

// Add TS type extensions for NextAuth
declare module "next-auth" {
  interface User {
    isPremium?: boolean;
  }
  
  interface Session {
    user?: {
      isPremium?: boolean;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isPremium?: boolean;
  }
} 