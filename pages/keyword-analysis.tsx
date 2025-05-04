import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const KeywordAnalysis: React.FC = () => {
  const { data: session } = useSession();
  
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">關鍵字分析</h1>
          <div className="border border-yellow-300 bg-yellow-50 rounded-md p-4 text-yellow-800">
            <p>關鍵字分析功能正在開發中，即將推出。</p>
            <p className="mt-2">此功能將提供更詳細的關鍵字搜尋趨勢分析，包括長尾關鍵詞、搜尋意圖分析等。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalysis; 