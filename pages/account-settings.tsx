import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AccountSettings: React.FC = () => {
  const { data: session } = useSession();
  const isPremium = (session?.user as any)?.isPremium || false;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            返回儀表板
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">帳戶設定</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">個人資料</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-4">
                <img 
                  src={session?.user?.image || '/default-avatar.png'} 
                  alt={session?.user?.name || '使用者'} 
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">{session?.user?.name || '使用者'}</p>
                  <p className="text-gray-500 text-sm">{session?.user?.email || ''}</p>
                  <p className="text-sm mt-1">
                    <span className={isPremium ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
                      {isPremium ? '專業版會員' : '免費版會員'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border border-yellow-300 bg-yellow-50 rounded-md p-4 text-yellow-800">
                <p>個人資料編輯功能正在開發中，即將推出。</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">訂閱管理</h2>
            <div className="border border-yellow-300 bg-yellow-50 rounded-md p-4 text-yellow-800">
              <p>訂閱管理功能正在開發中，即將推出。</p>
              <p className="mt-2">此功能將允許您管理訂閱計劃、查看帳單歷史及更新支付方式。</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-2">通知設定</h2>
            <div className="border border-yellow-300 bg-yellow-50 rounded-md p-4 text-yellow-800">
              <p>通知設定功能正在開發中，即將推出。</p>
              <p className="mt-2">此功能將允許您自訂電子郵件和應用內通知的接收偏好。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 