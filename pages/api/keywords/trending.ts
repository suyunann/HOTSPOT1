import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 熱門關鍵字排行榜數據
const trendingKeywords = [
  { 
    id: 1, 
    term: '2房1廳', 
    searchCount: 8642, 
    lastWeekCount: 6542,
    changeRate: 32.1,
    isRising: true,
    relatedTerms: ['2房', '小家庭', '首購族']
  },
  { 
    id: 2, 
    term: '近捷運', 
    searchCount: 7531, 
    lastWeekCount: 5887,
    changeRate: 28.0,
    isRising: true,
    relatedTerms: ['交通便利', '通勤', '捷運宅']
  },
  { 
    id: 3, 
    term: '新成屋', 
    searchCount: 6845, 
    lastWeekCount: 5519,
    changeRate: 24.0,
    isRising: true,
    relatedTerms: ['新建案', '預售屋', '現代宅']
  },
  { 
    id: 4, 
    term: '有車位', 
    searchCount: 5937, 
    lastWeekCount: 4990,
    changeRate: 19.0,
    isRising: true,
    relatedTerms: ['平面車位', '機械車位', '停車便利']
  },
  { 
    id: 5, 
    term: '近學區', 
    searchCount: 5426, 
    lastWeekCount: 4718,
    changeRate: 15.0,
    isRising: true,
    relatedTerms: ['明星學區', '學校', '教育特區']
  },
  { 
    id: 6, 
    term: '公園宅', 
    searchCount: 4972, 
    lastWeekCount: 4399,
    changeRate: 13.0,
    isRising: true,
    relatedTerms: ['綠地', '休閒', '運動']
  },
  { 
    id: 7, 
    term: '3房2廳', 
    searchCount: 4583, 
    lastWeekCount: 4166,
    changeRate: 10.0,
    isRising: true,
    relatedTerms: ['大空間', '家庭用', '三房']
  },
  { 
    id: 8, 
    term: '頂加', 
    searchCount: 4125, 
    lastWeekCount: 3819,
    changeRate: 8.0,
    isRising: true,
    relatedTerms: ['頂樓', '加蓋', '視野好']
  },
  { 
    id: 9, 
    term: '電梯大樓', 
    searchCount: 3876, 
    lastWeekCount: 3656,
    changeRate: 6.0,
    isRising: true,
    relatedTerms: ['大廈', '社區', '管理']
  },
  { 
    id: 10, 
    term: '河岸景觀', 
    searchCount: 3654, 
    lastWeekCount: 3480,
    changeRate: 5.0,
    isRising: true,
    relatedTerms: ['河濱公園', '景觀宅', '視野']
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: '請先登入系統' });
  }
  
  try {
    // 從數據庫獲取關鍵詞數據
    const keywords = await prisma.keyword.findMany({
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
    const results = isPremium ? keywords : keywords.slice(0, 5);
    
    res.status(200).json({
      keywords: results,
      totalCount: keywords.length,
      isPremium,
      lastUpdated: lastUpdated ? new Date(lastUpdated.value) : null
    });
  } catch (error) {
    console.error('獲取關鍵詞數據失敗:', error);
    res.status(500).json({ error: '獲取關鍵詞數據失敗' });
  } finally {
    await prisma.$disconnect();
  }
} 