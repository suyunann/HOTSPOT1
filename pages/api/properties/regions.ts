import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// 區域房源分佈數據 - 用於首頁圓餅圖顯示
const propertiesByRegion = [
  { region: '信義區', count: 857, percentage: 18.2 },
  { region: '內湖區', count: 723, percentage: 15.4 },
  { region: '中山區', count: 681, percentage: 14.5 },
  { region: '大安區', count: 642, percentage: 13.7 },
  { region: '松山區', count: 534, percentage: 11.4 },
  { region: '南港區', count: 398, percentage: 8.5 },
  { region: '文山區', count: 357, percentage: 7.6 },
  { region: '北投區', count: 248, percentage: 5.3 },
  { region: '士林區', count: 253, percentage: 5.4 }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: '請先登入系統' });
  }
  
  // 根據訂閱等級返回不同的數據量
  const isPremium = (session?.user as any)?.isPremium;
  const results = isPremium ? propertiesByRegion : propertiesByRegion.slice(0, 5);
  
  res.status(200).json({
    regions: results,
    totalCount: propertiesByRegion.reduce((acc, curr) => acc + curr.count, 0),
    isPremium
  });
} 