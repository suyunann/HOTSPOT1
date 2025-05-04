import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="熱點房探" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-primary-700">熱點房探</span>
          </div>
          <nav className="flex space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-primary-600">功能</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-primary-600">方案</Link>
            <Link href="#faq" className="text-gray-600 hover:text-primary-600">常見問題</Link>
            <button 
              onClick={() => signIn()} 
              className="btn btn-primary"
            >
              登入 / 註冊
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-50 to-primary-100 py-20">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                房產市場趨勢<span className="text-primary-600">一目了然</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                熱點房探是專為房產行銷打造的 AI 分析工具，分析房產熱度、
                搜尋趨勢，並提供精準 AI 行動建議。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => signIn()} 
                  className="btn btn-primary px-8 py-3"
                >
                  免費開始使用
                </button>
                <Link href="#demo" className="btn btn-outline px-8 py-3">
                  觀看示範
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image 
                src="/hero-image.png" 
                alt="熱點房探儀表板" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">功能一覽</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card hover:shadow-lg transition-shadow">
                  <div className="text-primary-600 text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">選擇適合您的方案</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`card relative ${
                    plan.featured ? 'border-2 border-primary-500 shadow-lg' : ''
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      最受歡迎
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/月</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => signIn()} 
                    className={`w-full btn ${
                      plan.featured ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/logo-white.svg" alt="熱點房探" width={40} height={40} />
                <span className="ml-2 text-xl font-bold">熱點房探</span>
              </div>
              <p className="text-gray-400">
                專為房產行銷打造的 AI 分析工具
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">功能</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">熱門房源排行</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">區域熱度分析</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">搜尋關鍵字排行</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">AI 趨勢預測</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">公司</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">關於我們</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">聯絡我們</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">隱私權政策</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">使用條款</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">聯絡資訊</h4>
              <ul className="space-y-2 text-gray-400">
                <li>service@hotspot-ai.com</li>
                <li>台北市信義區信義路五段7號</li>
                <li>(02) 2345-6789</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} 熱點房探 HotSpotAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sample data
const features = [
  {
    icon: '📊',
    title: '熱門房源排行榜',
    description: '即時掌握市場熱門房源，了解哪些房型最受歡迎，調整行銷策略。'
  },
  {
    icon: '🏙️',
    title: '區域熱度分析',
    description: '掌握不同地區的搜尋熱度變化，找出下一個熱門區域。'
  },
  {
    icon: '🔍',
    title: '搜尋關鍵字排行',
    description: '了解買家最關心什麼，根據熱門搜尋詞調整房源描述。'
  },
  {
    icon: '🤖',
    title: 'AI 行動建議',
    description: '獲得 AI 針對您的房源提供的專業行銷建議與文案。'
  },
  {
    icon: '📈',
    title: '趨勢預測',
    description: '預測下一個熱門區域和房型，搶先布局贏在起跑點。'
  },
  {
    icon: '📱',
    title: '隨時隨地掌握資訊',
    description: '手機、平板、電腦都能使用，隨時掌握市場動態。'
  },
];

const pricingPlans = [
  {
    title: '免費版',
    price: '0',
    features: [
      '熱門房源 Top3',
      '區域熱度 Top2',
      '每週 1 次 AI 建議',
      '基本數據圖表',
    ],
    buttonText: '免費註冊',
    featured: false
  },
  {
    title: '專業版',
    price: '99',
    features: [
      '完整熱門房源',
      '完整區域熱度分析',
      '每日 AI 建議',
      '趨勢預測',
      '高級數據視覺化',
      '歷史數據分析'
    ],
    buttonText: '選擇專業版',
    featured: true
  },
  {
    title: '團隊版',
    price: '299',
    features: [
      '多用戶帳號(5位)',
      '多區域報告',
      'API 數據導出',
      '競品分析',
      '專屬客戶經理',
      '自動生成廣告文案'
    ],
    buttonText: '選擇團隊版',
    featured: false
  }
];

export default LandingPage; 