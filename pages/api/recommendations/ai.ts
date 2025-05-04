import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// Mock data - in a real app, this would come from an AI model
const recommendations = [
  {
    id: 1,
    title: '廣告文案建議',
    content: '根據目前熱搜關鍵字，建議在廣告文案中強調"近捷運"、"有車位"等特色，吸引更多潛在買家。',
    icon: '📝'
  },
  {
    id: 2,
    title: '房源曝光建議',
    content: '本週四到週六是搜尋熱度最高的時段，建議在此時間發布新房源以獲得最大曝光率。',
    icon: '📊'
  },
  {
    id: 3,
    title: '價格策略',
    content: '信義區類似房型近期成交價上漲5.3%，建議適當調整目前待售房源的定價以符合市場預期。',
    icon: '💰'
  },
  {
    id: 4,
    title: '潛力區域',
    content: '南港區搜尋率增長迅速，建議增加此區域的房源收集與曝光，把握市場轉熱契機。',
    icon: '🔍'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  // Check if user is authenticated
  if (!session) {
    return res.status(401).json({ error: 'You must be signed in to access this data' });
  }
  
  // Determine how many recommendations to return based on subscription level
  const isPremium = session?.user?.isPremium;
  const results = isPremium ? recommendations : recommendations.slice(0, 1);
  
  // Get the next update date based on subscription level
  const now = new Date();
  let nextUpdate;
  
  if (isPremium) {
    // Premium users get daily updates
    nextUpdate = new Date(now);
    nextUpdate.setDate(nextUpdate.getDate() + 1);
    nextUpdate.setHours(9, 0, 0, 0);
  } else {
    // Free users get weekly updates on Monday
    nextUpdate = new Date(now);
    const daysUntilMonday = (1 + 7 - now.getDay()) % 7;
    nextUpdate.setDate(nextUpdate.getDate() + daysUntilMonday);
    nextUpdate.setHours(9, 0, 0, 0);
  }
  
  // Return the data
  res.status(200).json({ 
    recommendations: results,
    isPremium: isPremium,
    totalCount: recommendations.length,
    returnedCount: results.length,
    nextUpdate: nextUpdate.toISOString(),
    updateFrequency: isPremium ? 'daily' : 'weekly'
  });
} 