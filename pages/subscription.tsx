import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

const SubscriptionPage: React.FC = () => {
  const { data: session } = useSession();
  const isPremium = (session?.user as any)?.isPremium || false;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            返回儀表板
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">訂閱管理</h1>
          <p className="text-gray-600 mb-6">選擇最適合您的方案，立即體驗熱點房探的強大功能</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 免費方案 */}
            <div className={`border rounded-lg p-6 ${!isPremium ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">免費方案</h3>
                  <p className="text-gray-500 mt-1">基本功能，適合初次使用者</p>
                </div>
                <span className="text-xl font-bold text-gray-900">免費</span>
              </div>
              
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">熱門房源 Top3 排行榜</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">區域熱度 Top3 分析</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">每週 3 次 AI 建議</span>
                </li>
              </ul>
              
              <div className="mt-6">
                {!isPremium ? (
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    當前方案
                  </span>
                ) : (
                  <div className="text-gray-500 text-sm">
                    降級至此方案將失去專業版功能
                  </div>
                )}
              </div>
            </div>
            
            {/* 專業方案 */}
            <div className={`border rounded-lg p-6 ${isPremium ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">專業方案</h3>
                  <p className="text-gray-500 mt-1">完整功能，適合專業房產經紀</p>
                </div>
                <span className="text-xl font-bold text-gray-900">$99/月</span>
              </div>
              
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">熱門房源 Top50 完整排行榜</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">全區域熱度分析與細分</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">關鍵字深度分析與長尾詞推薦</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">每日 AI 建議與預測</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">優先獲取新功能與更新</span>
                </li>
              </ul>
              
              <div className="mt-6">
                {isPremium ? (
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    當前方案
                  </span>
                ) : (
                  <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    升級至專業版
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-yellow-300 bg-yellow-50 rounded-md p-4 text-yellow-800">
          <p>支付功能正在開發中，即將推出。</p>
          <p className="mt-2">訂閱管理完整功能將在下一版本中提供，敬請期待。</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage; 