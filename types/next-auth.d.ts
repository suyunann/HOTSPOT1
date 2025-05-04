import 'next-auth';

declare module 'next-auth' {
  interface User {
    isPremium?: boolean;
  }
  
  interface Session {
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      isPremium?: boolean;
    }
  }
} 