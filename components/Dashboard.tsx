import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ChartBarIcon, HomeIcon, KeyIcon, UserCircleIcon, CogIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { 
  TopPropertiesWidget,
  RegionHeatMapWidget,
  KeywordRankingWidget,
  AIRecommendationsWidget,
  StatCard
} from './modules';

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isPremium = (session?.user as any)?.isPremium || false;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/dashboard">
                <img src="/logo.svg" alt="熱點房探" className="w-8 h-8" />
                <span className="ml-2 text-lg font-semibold text-primary-700">熱點房探</span>
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/account-settings" className="text-gray-600 hover:text-primary-600 flex items-center">
                <CogIcon className="h-5 w-5 mr-1" />
                設定
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
                  <img 
                    src={session?.user?.image || '/default-avatar.png'} 
                    alt={session?.user?.name || '使用者'} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{session?.user?.name || '使用者'}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out z-10">
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">登入為</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      {session?.user?.email || ''}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link href="/account-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      帳號設定
                    </Link>
                    <Link href="/subscription" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      訂閱管理
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      登出
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {isMobileMenuOpen && (
            <div className="mt-2 md:hidden">
              <Link href="/account-settings" className="block py-2 text-gray-600 hover:text-primary-600">
                設定
              </Link>
              <div className="py-2">
                <Link href="/account-settings" className="block text-gray-600 hover:text-primary-600">
                  帳號設定
                </Link>
                <Link href="/subscription" className="block py-1 text-gray-600 hover:text-primary-600">
                  訂閱管理
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left py-1 text-gray-600 hover:text-primary-600"
                >
                  登出
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 h-screen bg-white shadow-sm">
          <div className="p-4">
            <div className={`flex items-center p-2 ${isPremium ? 'bg-yellow-50 border border-yellow-200 rounded-lg' : ''}`}>
              <div className="flex-shrink-0">
                <img 
                  src={session?.user?.image || '/default-avatar.png'} 
                  alt="使用者頭像" 
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">{session?.user?.name || '使用者'}</div>
                <div className={`text-xs ${isPremium ? 'text-yellow-600' : 'text-gray-500'}`}>
                  {isPremium ? '專業版會員' : '免費版會員'}
                </div>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link href="/dashboard" className="bg-primary-50 text-primary-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <HomeIcon className="mr-3 h-5 w-5" />
              儀表板
            </Link>
            <Link href="/data-analysis" className="text-gray-600 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <ChartBarIcon className="mr-3 h-5 w-5" />
              數據分析
            </Link>
            <Link href="/keyword-analysis" className="text-gray-600 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <KeyIcon className="mr-3 h-5 w-5" />
              關鍵字分析
            </Link>
            <Link href="/account-settings" className="text-gray-600 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <UserCircleIcon className="mr-3 h-5 w-5" />
              帳戶設定
            </Link>
          </nav>
          
          {!isPremium && (
            <div className="p-4 border-t border-gray-200">
              <div className="bg-primary-50 p-3 rounded-lg">
                <h4 className="text-primary-800 font-medium mb-2">升級專業版</h4>
                <p className="text-sm text-primary-700 mb-3">解鎖完整功能，成為市場贏家！</p>
                <Link href="/subscription" className="btn btn-primary w-full flex justify-between items-center">
                  <span>立即升級</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 py-6 px-4 md:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">市場分析儀表板</h1>
            <p className="text-gray-600">即時了解房產市場熱度與趨勢</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="房源搜尋量" 
              value="12,543" 
              change="+12.3%" 
              trend="up" 
              period="過去 7 天" 
            />
            <StatCard 
              title="熱門區域" 
              value="信義區" 
              change="+5.7%" 
              trend="up" 
              period="搜尋成長率" 
            />
            <StatCard 
              title="熱門房型" 
              value="2房2廳" 
              change="-2.1%" 
              trend="down" 
              period="本週趨勢" 
            />
            <StatCard 
              title="平均瀏覽時間" 
              value="2:34" 
              change="+0.8%" 
              trend="up" 
              period="分鐘/房源" 
            />
          </div>
          
          {/* Main Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TopPropertiesWidget isPremium={isPremium} />
            <RegionHeatMapWidget isPremium={isPremium} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <KeywordRankingWidget isPremium={isPremium} />
            <AIRecommendationsWidget isPremium={isPremium} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 