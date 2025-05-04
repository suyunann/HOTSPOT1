# 熱點房探 / HotSpotAI

熱點房探是專為房產行銷打造的 AI 分析工具，用於分析房產熱度、搜尋趨勢與提供 AI 行動建議。

## 功能特色

- **熱門房源排行榜** - 追蹤最受歡迎的房源，並根據搜尋量增長排序
- **區域熱度分析** - 了解不同區域的熱門程度與變化趨勢
- **搜尋關鍵字排行** - 掌握買家最關心的房屋特色
- **AI 行動建議** - 取得 AI 針對市場趨勢的建議與行銷提案
- **付費訂閱制** - 免費版本提供基本分析，付費會員解鎖完整功能

## 技術架構

- **前端**: React, Next.js, TailwindCSS
- **後端**: Next.js API Routes
- **認證**: NextAuth.js
- **資料視覺化**: Chart.js, React-ChartJS-2
- **UI 元件**: Headless UI, Heroicons

## 開始使用

1. 複製專案

```bash
git clone https://github.com/yourusername/hotspot-ai.git
cd hotspot-ai
```

2. 安裝相依套件

```bash
npm install
# 或
yarn install
```

3. 設定環境變數

建立 `.env.local` 檔案並填入以下內容：

```
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# 如果要使用 Google 登入
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. 啟動開發伺服器

```bash
npm run dev
# 或
yarn dev
```

5. 開啟瀏覽器前往 `http://localhost:3000`

## 測試帳號

可使用以下測試帳號登入系統：

- **專業版測試帳號**:
  - Email: test@example.com
  - Password: password

- **免費版測試帳號**:
  - Email: free@example.com
  - Password: password

## 部署

此專案可以輕鬆部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fhotspot-ai)

## 專案結構

```
hotspot-ai/
├── components/         # React 元件
│   ├── dashboard/      # 儀表板相關元件
│   ├── LandingPage.tsx # 首頁元件
│   └── Dashboard.tsx   # 儀表板主元件
├── pages/              # Next.js 頁面
│   ├── api/            # API 端點
│   ├── auth/           # 認證相關頁面
│   ├── _app.tsx        # 應用程式入口
│   └── index.tsx       # 首頁
├── public/             # 靜態資源
├── styles/             # 樣式檔案
├── utils/              # 通用功能
└── [其他設定檔]
```

## 功能開發路線圖

詳細的功能開發路線圖請參考 [ROADMAP.md](./ROADMAP.md)。

## 授權條款

© 2023 熱點房探 HotSpotAI. 保留所有權利。 