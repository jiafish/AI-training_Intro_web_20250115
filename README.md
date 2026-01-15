# Personal CV Site (intro-js)

一個風格典雅、內容清晰的個人履歷網站，使用純 HTML、CSS 和 Vanilla JavaScript 開發。

## 專案特色

- 🎨 **典雅視覺設計**：深色系背景搭配金色點綴
- 📱 **響應式設計**：完美支援桌面與行動裝置
- ✨ **流暢互動**：平滑滾動、卡片展開/收合、可勾選清單
- 💾 **狀態保存**：使用 localStorage 保存 checklist 狀態
- ♿ **可及性**：符合無障礙設計標準

## 技術棧

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Playfair Display, Inter)

## 專案結構

```
intro-js/
├── index.html      # 主 HTML 檔案
├── styles.css      # 樣式表
├── app.js          # JavaScript 功能
├── package.json    # 專案設定
├── .gitignore      # Git 忽略檔案
└── README.md       # 說明文件
```

## 功能說明

### FR-1: 導覽列
- 固定在頁面上方（sticky/fixed）
- 點擊項目平滑滾動到對應區塊
- 行動裝置支援漢堡選單

### FR-2: Block 1 首頁
- 中央放置自拍照片（portrait）
- 主要標題：「User Experience Designer」
- CTA 按鈕：「來看我的年度目標吧！」點擊後平滑滾動到半年規劃區塊

### FR-3: Block 2 半年規劃
- 卡片式呈現任務
- 點擊卡片標題展開/收合里程碑（accordion）
- 每個里程碑前有 checkbox，可勾選/取消
- 勾選狀態自動保存到 localStorage

### FR-4: Block 3 個人規劃
- 固定列出個人規劃項目
- 典雅風格呈現

## 安裝與使用

### 前置需求
- Node.js (建議 v14+)
- Yarn

### 安裝步驟

1. 進入專案目錄：
```bash
cd intro-js
```

2. 安裝依賴（如果需要）：
```bash
yarn install
```

3. 啟動開發伺服器：
```bash
yarn start
# 或
yarn dev
```

4. 在瀏覽器中開啟 `http://localhost:3000`（或伺服器顯示的網址）

### 直接開啟

也可以直接使用瀏覽器開啟 `index.html` 檔案，但建議使用本地伺服器以避免 CORS 問題。

## 自訂內容

### 修改任務與里程碑

編輯 `app.js` 中的 `planData` 陣列：

```javascript
const planData = [
    {
        id: 'task1',
        title: '您的任務標題',
        milestones: [
            { id: 'm1-1', text: '里程碑 1', checked: false },
            { id: 'm1-2', text: '里程碑 2', checked: false }
        ]
    }
];
```

### 修改個人規劃

編輯 `index.html` 中 Block 3 的 `<ul class="personal-list">` 區塊。

### 更換照片

將您的照片放置於 `../IMG/portrait.jpg`，或修改 `index.html` 中的圖片路徑。

### 調整顏色

編輯 `styles.css` 中的 CSS 變數：

```css
:root {
    --color-gold: #d4af37;  /* 金色 */
    --color-dark: #1a1a1a;  /* 深色背景 */
    /* ... */
}
```

## 瀏覽器支援

- Chrome (最新版)
- Safari (最新版)
- Edge (最新版)
- Firefox (最新版)

## 開發注意事項

- 所有資料集中在 `app.js` 的 `planData` 陣列中管理
- localStorage key: `planChecklistState`
- 使用 CSS Variables 方便主題調整
- 響應式斷點：968px（平板）、640px（手機）

## 授權

MIT License

## 聯絡方式

如有問題或建議，歡迎提出 Issue 或 Pull Request。
