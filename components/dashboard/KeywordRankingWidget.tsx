import React, { useState, useEffect } from 'react';
import { ArrowTrendingUpIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Keyword {
  id: number;
  term: string;
  searchCount: number;
  changeRate: number;
  isRising: boolean;
  relatedTerms?: string[];
}

interface KeywordRankingWidgetProps {
  isPremium: boolean;
}

const KeywordRankingWidget: React.FC<KeywordRankingWidgetProps> = ({ isPremium }) => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/keywords/trending');
        
        if (!response.ok) {
          throw new Error('無法獲取關鍵字排行榜數據');
        }
        
        const data = await response.json();
        setKeywords(data.keywords);
      } catch (err) {
        setError((err as Error).message);
        console.error('獲取關鍵字數據失敗:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchKeywords();
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

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">搜尋關鍵字排行榜</h2>
        <Link href="/keywords/analysis" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          查看完整報告
        </Link>
      </div>
      
      <div className="space-y-4">
        {keywords.map((keyword, index) => (
          <div key={keyword.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
              index < 3 ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {index + 1}
            </span>
            <div className="ml-3 flex-grow">
              <div className="flex items-center">
                <span className="text-gray-900 font-medium">{keyword.term}</span>
                {keyword.isRising && (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 ml-1" />
                )}
              </div>
              <div className="text-xs text-gray-500">
                {keyword.searchCount.toLocaleString()} 次搜尋
              </div>
            </div>
            <div className={`text-sm font-medium ${keyword.isRising ? 'text-green-600' : 'text-red-600'}`}>
              +{keyword.changeRate.toFixed(1)}%
            </div>
          </div>
        ))}
        
        {isPremium && keywords.length > 0 && keywords[0].relatedTerms && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">熱門長尾關鍵詞 - {keywords[0].term}</h3>
            <div className="flex flex-wrap gap-2">
              {keywords[0].relatedTerms.map((term, i) => (
                <span key={i} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {!isPremium && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center">
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">
              升級至<span className="font-medium text-primary-600">專業版</span>解鎖更多關鍵字並獲得長尾詞分析
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

export default KeywordRankingWidget; 