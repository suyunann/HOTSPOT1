import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: '請先登入系統' });
  }
  
  try {
    // 從數據庫獲取區域熱度數據
    const regions = await prisma.region.findMany({
      orderBy: {
        changeRate: 'desc'
      }
    });
    
    // 獲取最後更新時間
    const lastUpdated = await prisma.systemSetting.findUnique({
      where: {
        key: 'lastScraped'
      }
    });
    
    // 根據訂閱等級返回不同的數據量
    const isPremium = (session?.user as any)?.isPremium;
    const results = isPremium ? regions : regions.slice(0, 5);
    
    res.status(200).json({
      regions: results,
      totalCount: regions.length,
      isPremium,
      lastUpdated: lastUpdated ? new Date(lastUpdated.value) : null
    });
  } catch (error) {
    console.error('獲取區域熱度數據失敗:', error);
    res.status(500).json({ error: '獲取區域熱度數據失敗' });
  } finally {
    await prisma.$disconnect();
  }
} 