import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// Mock data - in a real app, this would come from a database
const hotRegions = [
  { id: 1, name: '信義區', city: '台北市', searchRate: '+28.3%', heatLevel: 5 },
  { id: 2, name: '內湖區', city: '台北市', searchRate: '+22.7%', heatLevel: 5 },
  { id: 3, name: '板橋區', city: '新北市', searchRate: '+20.1%', heatLevel: 4 },
  { id: 4, name: '南港區', city: '台北市', searchRate: '+19.5%', heatLevel: 4 },
  { id: 5, name: '中山區', city: '台北市', searchRate: '+18.2%', heatLevel: 4 },
  { id: 6, name: '新店區', city: '新北市', searchRate: '+17.3%', heatLevel: 3 },
  { id: 7, name: '文山區', city: '台北市', searchRate: '+15.8%', heatLevel: 3 },
  { id: 8, name: '三重區', city: '新北市', searchRate: '+14.5%', heatLevel: 3 },
  { id: 9, name: '大安區', city: '台北市', searchRate: '+13.6%', heatLevel: 3 },
  { id: 10, name: '中和區', city: '新北市', searchRate: '+12.4%', heatLevel: 2 },
  { id: 11, name: '淡水區', city: '新北市', searchRate: '+11.7%', heatLevel: 2 },
  { id: 12, name: '桃園區', city: '桃園市', searchRate: '+10.8%', heatLevel: 2 },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  // Check if user is authenticated
  if (!session) {
    return res.status(401).json({ error: 'You must be signed in to access this data' });
  }
  
  // Determine how many regions to return based on subscription level
  const isPremium = session?.user?.isPremium;
  const results = isPremium ? hotRegions : hotRegions.slice(0, 2);
  
  // Return the data
  res.status(200).json({ 
    regions: results,
    isPremium: isPremium,
    totalCount: hotRegions.length,
    returnedCount: results.length
  });
} 