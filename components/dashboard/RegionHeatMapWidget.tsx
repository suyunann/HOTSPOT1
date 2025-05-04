import React, { useState, useEffect } from 'react';
import { FireIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Region {
  id: number;
  region: string;
  searchCount: number;
  lastWeekCount: number;
  changeRate: number;
  trend: string;
  hotProperties: number;
  averagePrice: number;
}

interface RegionHeatMapWidgetProps {
  isPremium: boolean;
}

const RegionHeatMapWidget: React.FC<RegionHeatMapWidgetProps> = ({ isPremium }) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/regions/heat');
        
        if (!response.ok) {
          throw new Error('無法獲取區域熱度數據');
        }
        
        const data = await response.json();
        setRegions(data.regions);
      } catch (err) {
        setError((err as Error).message);
        console.error('獲取區域熱度數據失敗:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRegions();
  }, []);

  // Function to calculate heat level based on change rate
  const getHeatLevel = (changeRate: number): 1 | 2 | 3 | 4 | 5 => {
    if (changeRate >= 15) return 5;
    if (changeRate >= 12) return 4;
    if (changeRate >= 9) return 3;
    if (changeRate >= 6) return 2;
    return 1;
  };

  // Function to render heat level indicators
  const renderHeatLevel = (level: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FireIcon 
        key={index} 
        className={`h-4 w-4 ${
          index < level 
            ? 'text-red-500' 
            : 'text-gray-200'
        }`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/6 ml-auto"></div>
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

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">區域熱度分析</h2>
        <Link href="/regions/analysis" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          查看完整報告
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">區域</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">熱門房源</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">熱度</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">搜尋變化率</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {regions.map((region) => {
              const heatLevel = getHeatLevel(region.changeRate);
              
              return (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{region.region}</div>
                    <div className="text-xs text-gray-500">均價 {region.averagePrice} 萬/坪</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{region.hotProperties}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {renderHeatLevel(heatLevel)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-green-600">+{region.changeRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">{region.searchCount.toLocaleString()} 次搜尋</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {!isPremium && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">
              升級至<span className="font-medium text-primary-600">專業版</span>查看更多區域並解鎖捷運、商圈細分數據
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

export default RegionHeatMapWidget;