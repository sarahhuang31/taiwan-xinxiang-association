# 台灣心香協會官方網站

Taiwan Xinxiang Association — Official Website

這是一個靜態網站，不需要伺服器、資料庫或付費服務，可以直接部署到 GitHub Pages。
網站內容（活動、消息、公益案例、團隊）全部放在 `data/` 資料夾的文字檔中，在 GitHub 網頁上就能修改。

---

## 目錄

1. [網站架構](#一網站架構)
2. [上傳到 GitHub](#二上傳到-github)
3. [啟用 GitHub Pages](#三啟用-github-pages)
4. [上線後必做：設定網址](#四上線後必做設定網址)
5. [修改網站文字](#五修改網站文字)
6. [新增活動](#六新增活動)
7. [新增消息、公益案例、團隊成員](#七新增消息公益案例團隊成員)
8. [更換圖片](#八更換圖片)
9. [設定聯絡方式與表單](#九設定聯絡方式與表單)
10. [連結自訂網域](#十連結自訂網域)
11. [常見部署錯誤](#十一常見部署錯誤)
12. [待確認資料清單](#十二待確認資料清單)
13. [進階：重新編譯 CSS](#十三進階重新編譯-css)

---

## 一、網站架構

```
/
├── index.html            首頁
├── about.html            關於我們
├── approach.html         藝術對話
├── impact.html           公益行動
├── events.html           展覽與活動（可篩選資料庫）
├── global.html           國際交流
├── news.html             最新消息
├── contact.html          合作與聯絡
├── privacy.html          隱私權政策
├── 404.html              找不到頁面
├── en/index.html         英文版入口（準備中）
│
├── data/                 ★ 網站內容都在這裡
│   ├── site-config.js    協會名稱、聯絡資訊、社群連結、捐款資訊
│   ├── events.js         展覽與活動
│   ├── news.js           最新消息
│   ├── projects.js       公益行動案例
│   ├── exchanges.js      國際交流地區
│   └── team.js           創辦人與團隊
│
├── assets/
│   ├── css/site.css      網站樣式（已編譯完成，直接使用）
│   ├── js/main.js        網站程式
│   └── images/           圖片（命名規則見第八節）
│
├── sitemap.xml           給搜尋引擎的網站地圖
├── robots.txt            搜尋引擎規則
├── .nojekyll             告訴 GitHub Pages 不要轉換檔案（請勿刪除）
│
├── src/input.css         樣式原始檔（只在重新編譯 CSS 時使用）
├── tailwind.config.js    樣式設定（只在重新編譯 CSS 時使用）
├── package.json          編譯工具設定（只在重新編譯 CSS 時使用）
└── tools/                輔助工具（產生示意圖）
```

**技術說明**：HTML5、Tailwind CSS（已預先編譯為 `assets/css/site.css`）、原生 JavaScript。
網站所有連結都使用相對路徑，放在 `https://帳號.github.io/儲存庫名稱/` 底下也能正常運作。

---

## 二、上傳到 GitHub

### 方法 A：用網頁上傳（不需安裝任何軟體）

1. 登入 [GitHub](https://github.com)，右上角「+」→「New repository」。
2. Repository name 輸入英文名稱，例如 `xinxiang`。選擇 **Public**，按「Create repository」。
3. 在新的儲存庫頁面點「uploading an existing file」。
4. 把解壓縮後資料夾**裡面的所有檔案與資料夾**拖進網頁（不是拖整個外層資料夾）。
   - `node_modules` 資料夾不需要上傳（壓縮檔內已排除）。
   - `.nojekyll` 是隱藏檔，Mac 請按 `Command + Shift + .` 顯示隱藏檔後一起拖入。若漏傳，可在 GitHub 上「Add file → Create new file」，檔名輸入 `.nojekyll`，內容留空後儲存。
5. 下方按「Commit changes」。

### 方法 B：使用 GitHub Desktop

1. 安裝 [GitHub Desktop](https://desktop.github.com/) 並登入。
2. 「File → Add local repository」選擇網站資料夾，依提示建立儲存庫。
3. 按「Publish repository」，取消勾選「Keep this code private」。

---

## 三、啟用 GitHub Pages

1. 進入儲存庫 →「Settings」→ 左側「Pages」。
2. Source 選「Deploy from a branch」。
3. Branch 選 `main`，資料夾選 `/ (root)`，按「Save」。
4. 等待 1–3 分鐘，頁面上方會出現網址：`https://你的帳號.github.io/xinxiang/`。

之後每次修改檔案並 Commit，網站約 1 分鐘內自動更新。

---

## 四、上線後必做：設定網址

網站有幾處需要「完整網址」（給 Facebook 分享預覽與搜尋引擎使用），目前以 `https://YOUR-SITE-URL/` 暫代。

1. 在儲存庫頁面按鍵盤上的 `.`（句點），會開啟網頁版編輯器 github.dev。
2. 按 `Ctrl + Shift + H`（Mac：`Command + Shift + H`）開啟「全部取代」。
3. 上方輸入 `https://YOUR-SITE-URL/`，下方輸入你的正式網址（結尾保留 `/`），例如 `https://你的帳號.github.io/xinxiang/`。
4. 按「全部取代」圖示，再從左側「Source Control」輸入說明並「Commit & Push」。
5. 同時打開 `data/site-config.js`，在 `siteUrl: ""` 填入相同網址。

完成後可到 [Google Search Console](https://search.google.com/search-console) 提交 `sitemap.xml`。

---

## 五、修改網站文字

| 想改的內容 | 修改的檔案 |
|---|---|
| 協會名稱、英文名稱、標語 | `data/site-config.js` |
| 聯絡信箱、電話、地址、社群連結 | `data/site-config.js` |
| 活動、消息、公益案例、團隊、國際交流 | `data/` 內對應檔案 |
| 各頁固定文案（如首頁介紹、藝術對話說明） | 對應的 `.html` 檔 |

**在 GitHub 上修改檔案的步驟**：點進檔案 → 右上角鉛筆圖示 ✏️ → 修改 → 右上角「Commit changes」。

修改 `.html` 時，只改 `>` 與 `<` 之間的文字，不要動到 `<...>` 標籤本身。例如：

```html
<p class="lead reveal">← 不要動　這裡的文字可以改　不要動 →</p>
```

### 修改資料檔的三條規則

1. 文字放在英文雙引號 `"..."` 中；文字內若需要引號，請用中文引號「」。
2. 每個欄位結尾的英文逗號 `,` 不要刪除。
3. 改完後打開網站確認。若整頁內容消失，通常是少了逗號或引號——用 GitHub 的「History」查看上一個版本對照。

---

## 六、新增活動

打開 `data/events.js`，檔案最下方有一段「範本」。複製以下格式，貼在 `window.EVENTS = [` 下一行：

```js
  {
    id: "2027-spring-workshop",          // 英文小寫與連字號，不可重複
    title: "春日色彩工作坊",
    titleEn: "Spring Colour Workshop",
    date: "2027-03-15",                   // 開始日期 YYYY-MM-DD
    endDate: "",                          // 單日活動留空
    dateText: "",                         // 只知道月份時可填 "2027 年 3 月"
    location: "台中市某某藝文中心",
    city: "臺中",
    country: "台灣",
    category: "workshop",                 // exhibition / workshop / outreach / international
    partners: ["某某藝文中心"],
    description: "活動簡介……",
    image: "assets/images/events/2027-spring-workshop/cover.jpg",
    imageAlt: "參與者在長桌上以水彩創作",
    gallery: [
      { src: "assets/images/events/2027-spring-workshop/01.jpg", alt: "照片描述", caption: "圖說" },
    ],
    sourceUrl: "https://...",
    sourceName: "主辦單位活動頁",
    status: "auto",                       // auto 會依日期自動分到「近期」或「過去」
    featured: false,                      // true 會出現在首頁精選展覽（顯示最新 3 筆）
    verified: true,                       // false 會顯示「資料待確認」
    todo: "",
  },
```

- **近期／過去活動**：`status: "auto"` 時，網站依今天日期自動分類，不需手動移動。
- **年份篩選**：依 `date` 自動產生。
- **分享單一活動**：網址加上 `#活動id`，例如 `events.html#2026-heguang-tongchen`，打開即顯示該活動詳情。

---

## 七、新增消息、公益案例、團隊成員

- **最新消息** `data/news.js`：複製一整段 `{ ... },` 修改。`category` 可填 `association`（協會消息）、`media`（媒體報導）、`exhibition`、`outreach`、`international`。首頁顯示最新 3 則。
- **公益案例** `data/projects.js`：每筆包含名稱、時間、合作對象、摘要、照片、來源。**請勿填寫未經確認的參與人數、成效或受益者故事。**
- **國際交流** `data/exchanges.js`：`lat`、`lng` 是地圖座標，可在 Google 地圖對地點按右鍵複製。
- **團隊** `data/team.js`：`photo` 留空會顯示「照片待補」；`current: false` 代表歷史職務。

---

## 八、更換圖片

### 資料夾與命名規則

```
assets/images/
├── brand/          Logo、favicon、分享預覽圖 og-image.png（1200×630）
├── events/         活動照片，每個活動一個資料夾，名稱與活動 id 相同
│   └── 2026-heguang-tongchen/
│       ├── cover.jpg       封面
│       ├── 01.jpg          相簿照片依序編號
│       └── 02.jpg
├── projects/       公益案例照片，資料夾名稱 = 案例 id
├── news/           消息配圖：YYYY-MM-DD-簡短英文.jpg
├── team/           人物照：姓名拼音.jpg，例 wu-shuqin.jpg
├── artworks/       藝術作品：年份-作者拼音-作品名.jpg
└── placeholders/   版面示意圖（替換完成後可刪除）
```

檔名請用**英文小寫、數字與連字號**，不要用中文、空格或大寫。

### 上傳與替換步驟

1. 在 GitHub 進入 `assets/images/events/`，「Add file → Upload files」上傳照片。
   要建立新資料夾，可在「Create new file」的檔名欄輸入 `資料夾名稱/.gitkeep`。
2. 打開對應資料檔，把 `image:` 改為新路徑，並更新 `imageAlt` 的描述。
3. 首頁大圖：打開 `index.html`，搜尋 `ph-hero.svg` 替換路徑與 `alt` 文字。

### 圖片規格建議

| 用途 | 建議尺寸 | 格式 | 檔案大小 |
|---|---|---|---|
| 首頁主視覺 | 1600 × 2000 | JPG 或 WebP | 400 KB 以內 |
| 活動封面 | 1600 × 1200 | JPG 或 WebP | 300 KB 以內 |
| 相簿照片 | 1600 寬 | JPG 或 WebP | 300 KB 以內 |
| 人物照 | 800 × 1000 | JPG | 150 KB 以內 |

可用免費工具 [Squoosh](https://squoosh.app/) 壓縮：選 WebP、品質 75–80。

### 版權與倫理

- 使用協會擁有或已取得授權的照片；新聞媒體的照片未經授權不可下載使用。
- 涉及服務對象（教養院、養護中心等）的照片，須取得本人或法定代理人書面同意，並避免可辨識臉部。
- 目前所有圖片皆為**版面示意圖**，不是活動紀實照片；不要以 AI 生成圖片冒充活動紀錄。

---

## 九、設定聯絡方式與表單

GitHub Pages 沒有後端伺服器，聯絡表單無法自己寄信。網站依 `data/site-config.js` 的設定自動切換三種模式：

| 設定狀態 | 表單行為 |
|---|---|
| `email` 與 `formEndpoint` 都空白（目前） | 按下「整理訊息」後產生可複製的內容，並說明信箱確認中 |
| 填入 `email` | 按下「送出」會開啟訪客的郵件程式並帶入內容，訪客需自行按寄出 |
| 填入 `formEndpoint` | 由第三方表單服務寄送到協會信箱（體驗最好） |

### 使用 Formspree（免費方案每月 50 則）

1. 到 [formspree.io](https://formspree.io) 用協會信箱註冊。
2. 「New Form」建立表單，複製表單網址（類似 `https://formspree.io/f/abcdwxyz`）。
3. 貼到 `site-config.js` 的 `formEndpoint: ""` 中。
4. 第一次收到訊息時，依 Formspree 寄來的確認信完成驗證。

也可使用 Getform、Basin 等相容服務。使用第三方服務時，請同步檢查 `privacy.html` 的說明。

### 捐款資訊

`donation.enabled` 保持 `false`，直到協會確認捐款方式符合法規後，再填寫 `bankInfo` 並改為 `true`。

---

## 十、連結自訂網域

以 `www.xinxiang.org.tw` 為例：

1. 在網域商的 DNS 設定新增一筆 **CNAME**：主機 `www`，指向 `你的帳號.github.io`。
2. 若也要讓不含 www 的網址可用，新增四筆 **A** 紀錄指向：
   `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
3. GitHub 儲存庫 →「Settings → Pages → Custom domain」輸入 `www.xinxiang.org.tw`，按 Save。
4. DNS 生效後（數分鐘到 24 小時），勾選「Enforce HTTPS」。
5. 依第四節，把全站網址取代為 `https://www.xinxiang.org.tw/`。
6. 打開 `404.html`，把 `var SITE_BASE = "auto";` 改成 `var SITE_BASE = "/";`。

---

## 十一、常見部署錯誤

| 狀況 | 原因與解法 |
|---|---|
| 網站顯示 404 | Pages 剛啟用需等幾分鐘；確認 Settings → Pages 的 branch 為 `main`、資料夾為 `/ (root)`；確認 `index.html` 在儲存庫最外層，不在子資料夾內。 |
| 只有文字，沒有樣式 | `assets/css/site.css` 沒有上傳，或資料夾層級錯了。網址應為 `…/xinxiang/assets/css/site.css`。 |
| 活動、消息區塊空白 | `data/` 某個檔案語法錯誤（多半是少了逗號或引號）。在瀏覽器按 F12 →「Console」會顯示出錯的檔案與行數。用 GitHub「History」比對上一版。 |
| 圖片破圖 | 路徑大小寫不一致（`Cover.JPG` 與 `cover.jpg` 在網路上是不同檔案），或檔名含中文、空格。 |
| 改了內容但網站沒變 | 等 1–2 分鐘；按 `Ctrl + Shift + R` 強制重新整理；到儲存庫「Actions」分頁確認部署是否完成（綠色勾勾）。 |
| 分享到 Facebook 沒有預覽圖 | 尚未完成第四節的網址設定。設定後到 [Sharing Debugger](https://developers.facebook.com/tools/debug/) 重新抓取。 |
| 404 頁面樣式跑掉 | 使用自訂網域或 `帳號.github.io` 根目錄時，依第十節第 6 步修改 `404.html`。 |

---

## 十二、待確認資料清單

網站中標示「資料待確認」「連結待補」的項目，請協會核對後更新（將 `verified` 改為 `true`）：

- [ ] 英文正式名稱（`site-config.js` → `nameEnConfirmed`）
- [ ] 協會創立年份、正式宗旨（`about.html` 創立理念段落為建議文案）
- [ ] 首頁 Hero 文案（建議文案，非協會既定宗旨）
- [ ] 現任理事長與理監事名單；創辦人經歷與肖像（`team.js`）
- [ ] 公開聯絡信箱、電話、地址、社群連結（`site-config.js`）
- [ ] 各活動的來源網址：2023 愛的世界、2026 和光同塵、IESA、北加州台灣會館、新馬藝術教育計畫（`events.js`、`exchanges.js`）
- [ ] 舒心．美好藝術成果展的展期與協會角色
- [ ] 彰化老人養護中心、雲林榮譽國民之家的活動時間與來源（`projects.js`）
- [ ] 2023 媒體報導網址（`news.js`）
- [ ] 所有授權照片（目前皆為示意圖）
- [ ] 捐款方式與收據（`site-config.js` → `donation`）
- [ ] 隱私權政策內容
- [ ] 英文版翻譯（`en/index.html`，完成後將 `englishReady` 改為 `true`）

**資料原則**：不虛構參與人數、心理療效或受益者故事；曾提供場地或合作一次的單位，不標示為長期官方夥伴；新加坡及馬來西亞「超過 50 場」為合作團隊成果，非協會單獨績效；活動定位為藝術體驗與陪伴，不是藝術治療。

---

## 十三、進階：重新編譯 CSS

一般更新內容**不需要**這一步。只有在 HTML 或 JS 裡加入「網站原本沒用過的 Tailwind class」時，才需要重新編譯：

```bash
npm install          # 第一次使用時安裝工具
npm run build:css    # 產生新的 assets/css/site.css
npm run watch:css    # 開發時自動重新編譯
```

本機預覽網站：

```bash
python3 -m http.server 8000
# 瀏覽器開啟 http://localhost:8000/
```

顏色與字體定義在 `tailwind.config.js`：

| 名稱 | 色碼 | 用途 |
|---|---|---|
| paper | `#F7F4ED` | 主背景 |
| sage | `#D8DFD1` | 區塊背景 |
| rose / rose-deep | `#C5A8A0` / `#7C564E` | 裝飾 / 待確認標記文字 |
| gold / gold-deep | `#D0A76B` / `#7A5A2A` | 深底文字與裝飾 / 淺底小標 |
| forest | `#333B34` | 標題、深色區塊 |
| ink | `#343734` | 內文 |

淺色背景上的文字一律使用 `gold-deep`、`rose-deep`、`muted`，以符合 WCAG AA 對比度。
