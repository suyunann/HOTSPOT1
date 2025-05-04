import React, { useState, useEffect } from 'react';
import { LightBulbIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: 'opportunity' | 'trend' | 'warning';
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  createdAt: string;
}

interface AIRecommendationsWidgetProps {
  isPremium: boolean;
}

const AIRecommendationsWidget: React.FC<AIRecommendationsWidgetProps> = ({ isPremium }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/recommendations');
        
        if (!response.ok) {
          throw new Error('無法獲取AI推薦數據');
        }
        
        const data = await response.json();
        setRecommendations(data.recommendations);
        setNextUpdate(data.nextUpdate);
      } catch (err) {
        setError((err as Error).message);
        console.error('獲取AI推薦數據失敗:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, []);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'opportunity':
        return <span className="rounded-full bg-green-100 p-1.5"><LightBulbIcon className="h-4 w-4 text-green-600" /></span>;
      case 'trend':
        return <span className="rounded-full bg-blue-100 p-1.5"><ArrowRightIcon className="h-4 w-4 text-blue-600" /></span>;
      case 'warning':
        return <span className="rounded-full bg-yellow-100 p-1.5"><LightBulbIcon className="h-4 w-4 text-yellow-600" /></span>;
      default:
        return <span className="rounded-full bg-gray-100 p-1.5"><LightBulbIcon className="h-4 w-4 text-gray-600" /></span>;
    }
  };

  const getImpactClass = (impact: string) => {
    switch(impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
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

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">AI行銷推薦</h2>
          <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {isPremium ? '每日更新' : '每週更新'}
          </span>
        </div>
        <Link href="/recommendations" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          查看完整報告
        </Link>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="flex p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow">
            <div className="flex-shrink-0 mr-3">
              {getTypeIcon(rec.type)}
            </div>
            <div className="flex-grow">
              <div className="flex items-center mb-1">
                <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getImpactClass(rec.impact)}`}>
                  {rec.impact === 'high' ? '高' : rec.impact === 'medium' ? '中' : '低'}影響
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
              {rec.actionable && (
                <div className="mt-2">
                  <button className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center">
                    執行行動計畫
                    <ArrowRightIcon className="h-3 w-3 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {!isPremium && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">
              升級至<span className="font-medium text-primary-600">專業版</span>獲取更多AI推薦和預測
            </p>
            <button className="ml-auto btn btn-primary btn-sm">
              立即升級
            </button>
          </div>
        </div>
      )}
      
      {nextUpdate && (
        <div className="mt-4 flex items-center justify-end text-xs text-gray-500">
          <LightBulbIcon className="h-4 w-4 mr-1" />
          <span>下次更新: {new Date(nextUpdate).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsWidget; 