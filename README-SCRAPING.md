# 熱點房探 - 網路爬蟲功能說明

本文件說明如何設置和運行熱點房探的網路爬蟲功能，以從房地產網站獲取最新數據，每日自動更新2次。

## 功能概述

網路爬蟲功能可以:
- 從多個房地產網站抓取熱門房源信息
- 分析和整理區域熱度數據
- 生成關鍵字搜尋趨勢分析
- 提供基於最新市場數據的AI推薦
- 每日自動執行2次 (早上9點和下午5點)

## 前置需求

1. Node.js (v14+)
2. PostgreSQL 數據庫
3. 已配置 `.env` 文件

## 安裝與設置

### 1. 安裝依賴

確保已安裝所有需要的依賴:

```bash
npm install
```

### 2. 配置環境變數

創建或編輯 `.env` 文件，添加以下設置:

```
# 數據庫連接設定
DATABASE_URL="postgresql://username:password@localhost:5432/hotspot_db"

# 爬蟲API密鑰（用於授權觸發爬蟲操作）
SCRAPER_API_KEY="your-secret-scraper-api-key"

# 網站URL（用於爬蟲腳本）
NEXT_PUBLIC_API_URL="http://localhost:3000"

# NextAuth 設定
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
```

### 3. 設置數據庫

初始化 Prisma 並推送數據庫架構:

```bash
npx prisma db push
```

## 運行爬蟲

### 方法1: 手動觸發爬蟲

您可以通過訪問以下API端點手動觸發爬蟲:

```bash
curl -X POST http://localhost:3000/api/scraper \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-scraper-api-key"
```

### 方法2: 使用定時排程

啟動定時爬蟲服務 (每日早上9點和下午5點自動執行):

```bash
npm run scrape
```

此命令將啟動一個後台進程，該進程會按照指定的排程自動執行爬蟲。

### 方法3: 在服務器設置Cron作業

如果您在生產環境中部署，建議使用系統的cron作業:

```
# 編輯crontab
crontab -e

# 添加以下行 (每日9點和17點執行)
0 9,17 * * * cd /path/to/your/project && node scripts/schedule-scraping.js
```

## 自定義爬蟲邏輯

如需修改爬蟲邏輯以適應不同的網站，請編輯 `pages/api/scraper/index.ts` 文件。您可能需要調整以下部分:

1. `TARGET_SITES` 常量來添加或調整目標網站
2. `scrapeProperties()` 函數中的選擇器以匹配目標網站的DOM結構

## 注意事項

- 在生產環境中，建議將爬蟲腳本部署為獨立的服務，以避免影響主應用的性能
- 請遵守目標網站的爬蟲政策與使用條款
- 考慮實現IP輪換或調整請求頻率以避免被封禁
- 監控爬蟲日誌以確保持續運作
- 考慮實現數據備份機制，以防抓取失敗

## 故障排除

1. **爬蟲無法抓取數據**
   - 檢查目標網站是否更改了DOM結構
   - 確認網絡連接正常
   - 檢查是否被目標網站封鎖

2. **數據庫錯誤**
   - 確認PostgreSQL服務正在運行
   - 檢查 `.env` 中的數據庫連接字符串
   - 確認數據庫架構已正確設置

3. **排程未正常運行**
   - 檢查系統時間與時區設置
   - 確認 `node-cron` 依賴已正確安裝
   - 檢查 Node.js 進程是否被意外終止 