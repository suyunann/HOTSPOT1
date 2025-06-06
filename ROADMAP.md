# 熱點房探 / HotSpotAI 功能開發計畫

## 📌 簡介
熱點房探是一個專為房產行銷打造的 AI 分析工具，用於分析房產熱度、搜尋趨勢與提供 AI 行動建議。  
商業模式採訂閱制，免費用戶提供簡版分析，付費用戶解鎖高級數據與預測。

---

## 🛠️ 功能開發里程碑（Roadmap）

### 1️⃣ MVP 階段（核心功能）
- [ ] 熱門房源排行榜（Top10，按搜尋率增長排序）
- [ ] 區域熱度分析（縣市／地區熱度變化率）
- [ ] 搜尋關鍵字排行榜
- [ ] 基本用戶權限（免費 / 付費切換）
- [ ] 簡單後台管理（用戶訂閱、用戶數據）

---

### 2️⃣ 進階功能（付費誘因）
- [ ] 熱門房源 Top50 解鎖（付費專屬）
- [ ] 區域細分到捷運站、商圈
- [ ] 關鍵字深度分析（長尾詞、需求變化）
- [ ] AI 行動建議（廣告投放、推薦文案）
- [ ] AI 趨勢預測（下一個熱點地區／房型）
- [ ] 圖形化分析（熱力地圖、曲線圖、柱狀圖）

---

### 3️⃣ 超進階功能（高端用戶／企業方案）
- [ ] 競品分析（同區對手曝光量、搜尋率比較）
- [ ] 廣告投放 API 整合（FB / Google Ads）
- [ ] 自動生成 Landing Page + 廣告文案
- [ ] 專屬顧問 / 成交教練報告（可選服務）

---

## 💻 技術架構建議
- **前端**：React / Next.js、TailwindCSS
- **後端**：Node.js / Python (FastAPI)、PostgreSQL
- **資料來源**：房產平台爬蟲、API 整合、Google Trends
- **AI 模型**：NLP 關鍵字分析、簡單 ML 熱度預測
- **部署**：AWS / GCP、Docker、CI/CD

---

## 💸 收費方案（商業模式）
- 免費方案：
  - 熱門房源 Top3
  - 區域熱度 Top2
  - 每週 1 次 AI 建議
- 專業版（$99/月）：
  - 全榜單、細分分析、每日 AI 建議、預測模型
- 團隊版（$299/月）：
  - 多用戶、多區域報告、API 數據導出

---

## 📈 KPI 指標
- 用戶轉換率（免費 → 付費）
- 用戶活躍度（每週登入率、分析使用次數）
- 平均訂閱金額（ARPU）
- 客戶留存率（Retention Rate）

---

## 📅 預估時間表
| 階段       | 內容                           | 時間          |
|------------|--------------------------------|-------------|
| MVP       | 核心功能、後台、簡單前端        | 2-3 個月    |
| 進階版    | 付費功能、AI 建議、熱力地圖      | 3-4 個月    |
| 超進階版  | 競品分析、廣告 API、企業報告    | 2-3 個月    |

---

## ⚡ 其他備註
- 設計要簡潔、輕量，讓房仲一看就懂  
- 用戶 onboarding 流程要快速，3 分鐘內能上手  
- 強化用戶黏著度：通知提醒、排行榜更新、AI 每日推播 