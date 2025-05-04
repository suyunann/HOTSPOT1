import React from 'react';
import { getSession } from 'next-auth/react';
import LandingPage from '../components/LandingPage';

export default function Home() {
  return <LandingPage />;
}

// 如果用戶已登入，自動重定向到儀表板
export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  
  return {
    props: {}
  };
} 