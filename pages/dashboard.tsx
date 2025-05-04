import React from 'react';
import { getSession } from 'next-auth/react';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  return <Dashboard />;
}

// 確保頁面需要身份驗證
export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  return {
    props: { session }
  };
} 