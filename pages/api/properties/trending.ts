import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 熱門房源排行榜數據 - 按搜尋率增長排序
const trendingProperties = [
  {
    id: 1,
    title: '信義區豪華三房',
    address: '台北市信義區松仁路58號',
    price: 4580,
    size: 35.8,
    type: '3房2廳',
    searchCount: 3254,
    searchIncrease: 32.5,
    imageUrl: '/properties/property-1.jpg'
  },
  {
    id: 2,
    title: '內湖科技園區精華地段',
    address: '台北市內湖區瑞光路513號',
    price: 3280,
    size: 28.5,
    type: '2房2廳',
    searchCount: 2987,
    searchIncrease: 27.8,
    imageUrl: '/properties/property-2.jpg'
  },
  {
    id: 3,
    title: '大安森林公園第一排',
    address: '台北市大安區新生南路一段97號',
    price: 5120,
    size: 42.3,
    type: '4房2廳',
    searchCount: 2876,
    searchIncrease: 25.2,
    imageUrl: '/properties/property-3.jpg'
  },
  {
    id: 4,
    title: '松山南京復興電梯大樓',
    address: '台北市松山區南京東路五段223號',
    price: 2950,
    size: 25.7,
    type: '2房1廳',
    searchCount: 2543,
    searchIncrease: 23.1,
    imageUrl: '/properties/property-4.jpg'
  },
  {
    id: 5,
    title: '中山雙捷運精華地段',
    address: '台北市中山區林森北路511號',
    price: 3150,
    size: 27.8,
    type: '2房2廳',
    searchCount: 2376,
    searchIncrease: 21.7,
    imageUrl: '/properties/property-5.jpg'
  },
  {
    id: 6,
    title: '南港車站旁新成屋',
    address: '台北市南港區忠孝東路七段482號',
    price: 2780,
    size: 23.9,
    type: '2房1廳',
    searchCount: 2158,
    searchIncrease: 19.3,
    imageUrl: '/properties/property-6.jpg'
  },
  {
    id: 7,
    title: '文山捷運共構宅',
    address: '台北市文山區羅斯福路六段392號',
    price: 2580,
    size: 21.6,
    type: '2房1廳',
    searchCount: 1987,
    searchIncrease: 17.5,
    imageUrl: '/properties/property-7.jpg'
  },
  {
    id: 8, 
    title: '北投溫泉區景觀宅',
    address: '台北市北投區光明路224號',
    price: 2860,
    size: 24.3,
    type: '2房2廳',
    searchCount: 1876,
    searchIncrease: 16.2,
    imageUrl: '/properties/property-8.jpg'
  },
  {
    id: 9,
    title: '士林夜市商圈店面',
    address: '台北市士林區文林路312號',
    price: 3250,
    size: 18.5,
    type: '1房1廳',
    searchCount: 1765,
    searchIncrease: 15.8,
    imageUrl: '/properties/property-9.jpg'
  },
  {
    id: 10,
    title: '信義市政府站豪宅',
    address: '台北市信義區松智路25號',
    price: 6850,
    size: 53.2,
    type: '4房3廳',
    searchCount: 1689,
    searchIncrease: 14.3,
    imageUrl: '/properties/property-10.jpg'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: '請先登入系統' });
  }
  
  try {
    // 從數據庫獲取房源數據
    const properties = await prisma.property.findMany({
      orderBy: {
        searchIncrease: 'desc'
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
    const results = isPremium ? properties : properties.slice(0, 3);
    
    res.status(200).json({
      properties: results,
      totalCount: properties.length,
      isPremium,
      lastUpdated: lastUpdated ? new Date(lastUpdated.value) : null
    });
  } catch (error) {
    console.error('獲取房源數據失敗:', error);
    res.status(500).json({ error: '獲取房源數據失敗' });
  } finally {
    await prisma.$disconnect();
  }
} 