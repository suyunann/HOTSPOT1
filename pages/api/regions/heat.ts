import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// 區域熱度分析數據 - 按熱度變化率排序
const regionsHeatData = [
  {
    id: 1,
    region: '信義區',
    searchCount: 15783,
    lastWeekCount: 13485,
    changeRate: 17.0,
    trend: 'up',
    hotProperties: 187,
    averagePrice: 98.6
  },
  {
    id: 2,
    region: '內湖區',
    searchCount: 12459,
    lastWeekCount: 10812,
    changeRate: 15.2,
    trend: 'up',
    hotProperties: 156,
    averagePrice: 72.3
  },
  {
    id: 3,
    region: '士林區',
    searchCount: 9876,
    lastWeekCount: 8796,
    changeRate: 12.3,
    trend: 'up',
    hotProperties: 132,
    averagePrice: 68.7
  },
  {
    id: 4,
    region: '大安區',
    searchCount: 11254,
    lastWeekCount: 10124,
    changeRate: 11.2,
    trend: 'up',
    hotProperties: 145,
    averagePrice: 102.4
  },
  {
    id: 5,
    region: '松山區',
    searchCount: 8972,
    lastWeekCount: 8124,
    changeRate: 10.4,
    trend: 'up',
    hotProperties: 118,
    averagePrice: 85.9
  },
  {
    id: 6,
    region: '中山區',
    searchCount: 9845,
    lastWeekCount: 8975,
    changeRate: 9.7,
    trend: 'up',
    hotProperties: 129,
    averagePrice: 82.3
  },
  {
    id: 7,
    region: '南港區',
    searchCount: 7123,
    lastWeekCount: 6582,
    changeRate: 8.2,
    trend: 'up',
    hotProperties: 95,
    averagePrice: 66.8
  },
  {
    id: 8,
    region: '文山區',
    searchCount: 6582,
    lastWeekCount: 6124,
    changeRate: 7.5,
    trend: 'up',
    hotProperties: 87,
    averagePrice: 59.2
  },
  {
    id: 9,
    region: '北投區',
    searchCount: 5987,
    lastWeekCount: 5628,
    changeRate: 6.4,
    trend: 'up',
    hotProperties: 76,
    averagePrice: 62.5
  },
  {
    id: 10,
    region: '萬華區',
    searchCount: 5124,
    lastWeekCount: 4863,
    changeRate: 5.4,
    trend: 'up',
    hotProperties: 68,
    averagePrice: 56.7
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: '請先登入系統' });
  }
  
  // 根據訂閱等級返回不同的數據量
  const isPremium = (session?.user as any)?.isPremium;
  const results = isPremium ? regionsHeatData : regionsHeatData.slice(0, 3);
  
  res.status(200).json({
    regions: results,
    totalCount: regionsHeatData.length,
    isPremium,
    lastUpdated: new Date().toISOString()
  });
} 