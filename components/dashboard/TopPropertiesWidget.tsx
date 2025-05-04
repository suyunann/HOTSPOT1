import React, { useState, useEffect } from 'react';
import { ArrowUpIcon, LockClosedIcon, ClockIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  size: number;
  type: string;
  searchCount: number;
  searchIncrease: number;
  imageUrl: string;
}

interface TopPropertiesWidgetProps {
  isPremium: boolean;
}

const TopPropertiesWidget: React.FC<TopPropertiesWidgetProps> = ({ isPremium }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/properties/trending');
        
        if (!response.ok) {
          throw new Error('無法獲取熱門房源數據');
        }
        
        const data = await response.json();
        setProperties(data.properties);
        setLastUpdated(data.lastUpdated ? new Date(data.lastUpdated) : null);
      } catch (err) {
        setError((err as Error).message);
        console.error('獲取熱門房源數據失敗:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="rounded-full bg-slate-200 h-8 w-8"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-6">
          <p className="text-red-500">{error}</p>
          <button 
            className="mt-3 btn btn-primary btn-sm"
            onClick={() => window.location.reload()}
          >
            重試
          </button>
        </div>
      </div>
    );
  }

  // 格式化上次更新時間
  const formatLastUpdated = () => {
    if (!lastUpdated) return '數據尚未更新';
    
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} 分鐘前更新`;
    } else if (diffHours < 24) {
      return `${diffHours} 小時前更新`;
    } else {
      return `${diffDays} 天前更新`;
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">熱門房源排行榜</h2>
        <Link href="/properties/trending" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          查看完整報告
        </Link>
      </div>
      
      {lastUpdated && (
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <ClockIcon className="h-3.5 w-3.5 mr-1" />
          <span>{formatLastUpdated()} (每日更新2次)</span>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">房源</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">類型</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">搜尋成長率</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property, index) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                      index < 3 ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-md object-cover" src={property.imageUrl || '/property-placeholder.jpg'} alt={property.title} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-xs text-gray-500">{property.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{property.type}</div>
                  <div className="text-xs text-gray-500">{property.size}坪 / {property.price}萬</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end text-sm font-medium text-green-600">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    +{property.searchIncrease.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    {property.searchCount.toLocaleString()}次搜尋
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {!isPremium && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">
              升級至<span className="font-medium text-primary-600">專業版</span>解鎖完整 Top 50 熱門房源排行榜
            </p>
            <button className="ml-auto btn btn-primary btn-sm">
              立即升級
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPropertiesWidget; 