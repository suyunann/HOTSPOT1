const axios = require('axios');
require('dotenv').config();

// 設定API金鑰 (需要在環境變數中配置)
const API_KEY = process.env.SCRAPER_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// 定義日誌功能
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// 執行爬蟲函數
async function runScraper() {
  log('開始執行網路爬蟲...');
  
  try {
    const response = await axios.post(`${API_URL}/api/scraper`, {}, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    
    if (response.status === 200) {
      const data = response.data;
      log(`爬蟲任務成功完成！`);
      log(`爬取結果統計:`);
      log(`- 房源: ${data.scraped.propertiesCount}`);
      log(`- 區域: ${data.scraped.regionsCount}`);
      log(`- 關鍵字: ${data.scraped.keywordsCount}`);
      log(`- 推薦: ${data.scraped.recommendationsCount}`);
      log(`數據最後更新時間: ${data.lastUpdated}`);
    } else {
      log(`爬蟲任務失敗，HTTP狀態碼: ${response.status}`);
    }
  } catch (error) {
    log(`爬蟲任務執行錯誤: ${error.message}`);
    if (error.response) {
      log(`錯誤詳情: ${JSON.stringify(error.response.data)}`);
    }
  }
}

// 立即執行
runScraper()
  .then(() => {
    log('爬蟲任務已完成');
    process.exit(0);
  })
  .catch(err => {
    log(`遇到錯誤: ${err.message}`);
    process.exit(1);
  }); 