import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/">
            <div className="flex justify-center">
              <Image src="/logo.svg" alt="熱點房探" width={60} height={60} />
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            註冊新帳戶
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            或{' '}
            <Link href="/" className="font-medium text-primary-600 hover:text-primary-500">
              返回首頁
            </Link>
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-5">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                註冊功能開發中
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  註冊功能正在開發中，目前您可以使用下方提供的測試帳號進行系統體驗。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/auth/signin"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            前往登入頁面
          </Link>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="text-xs text-gray-500 text-center">
            為方便體驗，您可以使用以下測試帳戶登入：<br />
            <span className="font-semibold">專業版帳戶：</span> test@example.com / password<br />
            <span className="font-semibold">免費版帳戶：</span> free@example.com / password
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
}; 