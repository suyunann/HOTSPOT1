import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// Mock data - in a real app, this would come from a database
const topProperties = [
  {
    id: 1,
    name: '信義區豪宅',
    location: '台北市信義區',
    searchGrowth: '+23.5%',
    trend: 'up',
    image: '/property-1.jpg'
  },
  {
    id: 2,
    name: '中山雙捷運宅',
    location: '台北市中山區',
    searchGrowth: '+18.7%',
    trend: 'up',
    image: '/property-2.jpg'
  },
  {
    id: 3,
    name: '板橋新建案',
    location: '新北市板橋區',
    searchGrowth: '+15.2%',
    trend: 'up',
    image: '/property-3.jpg'
  },
  {
    id: 4,
    name: '內湖科技園區',
    location: '台北市內湖區',
    searchGrowth: '+12.8%',
    trend: 'up',
    image: '/property-4.jpg'
  },
  {
    id: 5,
    name: '新店捷運宅',
    location: '新北市新店區',
    searchGrowth: '+10.5%',
    trend: 'up',
    image: '/property-5.jpg'
  },
  {
    id: 6,
    name: '三重重劃區',
    location: '新北市三重區',
    searchGrowth: '+9.3%',
    trend: 'up',
    image: '/property-6.jpg'
  },
  {
    id: 7,
    name: '桃園航空城',
    location: '桃園市大園區',
    searchGrowth: '+8.1%',
    trend: 'up',
    image: '/property-7.jpg'
  },
  {
    id: 8,
    name: '淡水河岸宅',
    location: '新北市淡水區',
    searchGrowth: '+7.6%',
    trend: 'up',
    image: '/property-8.jpg'
  },
  {
    id: 9,
    name: '中和捷運共構宅',
    location: '新北市中和區',
    searchGrowth: '+6.9%',
    trend: 'up',
    image: '/property-9.jpg'
  },
  {
    id: 10,
    name: '南港車站特區',
    location: '台北市南港區',
    searchGrowth: '+6.4%',
    trend: 'up',
    image: '/property-10.jpg'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  // Check if user is authenticated
  if (!session) {
    return res.status(401).json({ error: 'You must be signed in to access this data' });
  }
  
  // Determine how many properties to return based on subscription level
  const isPremium = session?.user?.isPremium;
  const results = isPremium ? topProperties : topProperties.slice(0, 3);
  
  // Return the data
  res.status(200).json({ 
    properties: results,
    isPremium: isPremium,
    totalCount: topProperties.length,
    returnedCount: results.length
  });
} 