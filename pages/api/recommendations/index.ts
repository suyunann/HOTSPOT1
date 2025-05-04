import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// AI推薦數據
const aiRecommendations = [
  {
    id: 1,
    title: '信義區2房型投資機會',
    description: '信義區2房型房源搜尋量上漲32%，但房源數量減少15%，建議增加該區域房源曝光。',
    type: 'opportunity',
    impact: 'high',
    actionable: true,
    createdAt: '2023-09-15T08:30:00Z'
  },
  {
    id: 2,
    title: '南港區新興趨勢',
    description: '南港區交通建設完善後，搜尋量持續上升，成為潛在熱點區域。',
    type: 'trend',
    impact: 'medium',
    actionable: true,
    createdAt: '2023-09-15T08:30:00Z'
  },
  {
    id: 3,
    title: '注意內湖區價格波動',
    description: '內湖區近期價格波動較大，建議密切關注市場動態。',
    type: 'warning',
    impact: 'medium',
    actionable: false,
    createdAt: '2023-09-15T08:30:00Z'
  },
  {
    id: 4,
    title: '中山區小坪數房源需求增加',
    description: '中山區20-30坪房源搜尋量增加20%，建議調整房源組合。',
    type: 'opportunity',
    impact: 'medium',
    actionable: true,
    createdAt: '2023-09-14T14:15:00Z'
  },
  {
    id: 5,
    title: '客群年齡層變化',
    description: '25-35歲族群搜尋量占比增加，建議針對首購族群設計行銷文案。',
    type: 'trend',
    impact: 'high',
    actionable: true,
    createdAt: '2023-09-14T11:20:00Z'
  },
  {
    id: 6,
    title: '文山區價格優勢',
    description: '文山區房價相對穩定，性價比高，適合強調投資價值。',
    type: 'opportunity',
    impact: 'low',
    actionable: true,
    createdAt: '2023-09-13T16:45:00Z'
  },
  {
    id: 7,
    title: '大安區學區房需求旺季',
    description: '近期大安區學區房搜尋量增加15%，建議強調教育資源優勢。',
    type: 'opportunity',
    impact: 'high',
    actionable: true,
    createdAt: '2023-09-13T09:30:00Z'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: '請先登入系統' });
  }
  
  try {
    // 從數據庫獲取AI推薦數據
    const recommendations = await prisma.recommendation.findMany();
    
    // 獲取最後更新時間
    const lastUpdated = await prisma.systemSetting.findUnique({
      where: {
        key: 'lastScraped'
      }
    });
    
    // 根據訂閱等級返回不同的數據量
    const isPremium = (session?.user as any)?.isPremium;
    const results = isPremium ? recommendations : recommendations.slice(0, 1);
    
    res.status(200).json({
      recommendations: results,
      totalCount: recommendations.length,
      isPremium,
      lastUpdated: lastUpdated ? new Date(lastUpdated.value) : null
    });
  } catch (error) {
    console.error('獲取AI推薦數據失敗:', error);
    res.status(500).json({ error: '獲取AI推薦數據失敗' });
  } finally {
    await prisma.$disconnect();
  }
} 