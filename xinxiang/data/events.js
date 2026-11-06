/* =====================================================================
 * 展覽與活動資料 events.js
 * ---------------------------------------------------------------------
 * 新增一筆活動：複製最下方「範本」整段（從 { 到 },），貼到清單中，修改內容即可。
 *
 * 欄位說明
 *   id          英文小寫與連字號，不可重複。例 "2027-spring-workshop"
 *   title       活動名稱
 *   titleEn     英文名稱（選填）
 *   date        開始日期，格式 "YYYY-MM-DD"。只知道月份時填該月 1 日，並填 dateText
 *   endDate     結束日期（單日活動可留空 ""）
 *   dateText    顯示用日期文字（選填）。填了會取代自動產生的日期，例 "2025 年 7 月"
 *   location    地點
 *   city / country  城市與國家（國際交流頁使用）
 *   category    分類，只能填以下其中一個：
 *                 "exhibition"     藝術展覽 Art Exhibition
 *                 "workshop"       藝術工作坊 Art Workshop
 *                 "outreach"       公益行動 Community Outreach
 *                 "international"  國際交流 International Exchange
 *   partners    合作單位清單（僅列已確認者，請勿將場地提供者寫成長期夥伴）
 *   description 活動簡介（請依可查證資料撰寫）
 *   image       封面圖片路徑。例 "assets/images/events/2026-heguang/cover.jpg"
 *   imageAlt    圖片替代文字（描述圖片內容，給視障者與搜尋引擎）
 *   gallery     更多照片 [{ src: "...", alt: "...", caption: "..." }]
 *   sourceUrl   資料來源網址（新聞、文化部、主辦單位頁面）
 *   sourceName  資料來源名稱
 *   status      "auto"（依日期自動判斷）、"upcoming"、"ongoing"、"past"
 *   featured    true 代表顯示在首頁「精選展覽」
 *   verified    true = 資料已核對；false = 網站會顯示「待確認」標記
 *   todo        給管理者看的待辦說明（網站不顯示）
 * ===================================================================== */
window.EVENTS = [
  {
    id: "2026-heguang-tongchen",
    title: "和光同塵：宇宙星辰間的神聖意象藝術聯展",
    titleEn: "Harmony of Light and Dust: Sacred Imagery Among the Stars",
    date: "2026-10-01",
    endDate: "2026-10-26",
    dateText: "",
    location: "國立臺東生活美學館",
    city: "臺東",
    country: "台灣",
    category: "exhibition",
    partners: ["國立臺東生活美學館"],
    description:
      "集結 15 位藝術家、60 餘件作品，以宇宙星辰為意象，邀請觀者在畫面之間思考生命、心靈感受與自我覺察。展覽將藝術視為一種沉靜的提問：當我們抬頭看見星空，也看見自己內在的位置。",
    image: "assets/images/placeholders/ph-exhibition-stars.svg",
    imageAlt: "示意圖：深色背景上的金色圓弧與星點，代表展覽主題意象（待替換為授權展場照片）",
    gallery: [],
    sourceUrl: "", // TODO：貼上文化部或國立臺東生活美學館的活動頁網址
    sourceName: "公開文化活動資料",
    status: "auto",
    featured: true,
    verified: true,
    todo: "補上活動頁網址、英文展名確認、展場照片與參展藝術家名單",
  },
  {
    id: "2025-shuxin-meihao",
    title: "舒心．美好藝術成果展",
    titleEn: "Ease & Beauty: Art Outcomes Exhibition",
    date: "2025-07-01",
    endDate: "",
    dateText: "2025 年 7 月",
    location: "衛生福利部南港大樓",
    city: "臺北",
    country: "台灣",
    category: "exhibition",
    partners: ["衛生福利部雲林教養院"],
    description:
      "展出與衛生福利部雲林教養院藝術活動相關的成果作品。作品呈現創作者以色彩與線條表達感受的過程，也讓公部門場域成為認識多元創作者的窗口。",
    image: "assets/images/placeholders/ph-exhibition-sage.svg",
    imageAlt: "示意圖：鼠尾草綠與霧玫瑰色塊交疊的抽象構圖（待替換為授權作品照片）",
    gallery: [],
    sourceUrl: "https://yleni.mohw.gov.tw/files/雲林教養院院刊-第34期.pdf",
    sourceName: "衛生福利部雲林教養院院刊第 34 期（目錄列有本展相關文章）",
    status: "auto",
    featured: true,
    verified: false,
    todo: "確認展期起訖日、協會在本展中的角色、作品授權與照片",
  },
  {
    id: "2023-world-of-love",
    title: "2023 愛的世界",
    titleEn: "A World of Love 2023",
    date: "2023-02-16",
    endDate: "2023-03-23",
    dateText: "",
    location: "鹿港鎮圖書藝文中心",
    city: "彰化鹿港",
    country: "台灣",
    category: "exhibition",
    partners: ["台灣心香協會", "星之光藝術空間"],
    description:
      "以「愛」為主題，透過藝術探索內在交流與生命感受。展覽邀請觀者放慢腳步，從色彩與畫面中辨認屬於自己的情感經驗。",
    image: "assets/images/placeholders/ph-exhibition-rose.svg",
    imageAlt: "示意圖：米白底色上的霧玫瑰色圓形與細線（待替換為授權展場照片）",
    gallery: [],
    sourceUrl: "", // TODO：貼上公開報導或活動頁網址
    sourceName: "公開報導",
    status: "auto",
    featured: true,
    verified: true,
    todo: "補上報導網址與展場照片",
  },
  {
    id: "2025-iesa-paris",
    title: "法國巴黎 IESA 藝術文化管理學院藝術交流",
    titleEn: "Art Exchange at IESA, Paris",
    date: "2025-01-01",
    endDate: "",
    dateText: "2025 年",
    location: "IESA 藝術文化管理學院",
    city: "巴黎",
    country: "法國",
    category: "international",
    partners: ["IESA"],
    description:
      "公開資料提及協會及合作團隊於 2025 年在巴黎 IESA 進行藝術交流。交流形式與內容細節待協會提供資料後補充。",
    image: "assets/images/placeholders/ph-international-paris.svg",
    imageAlt: "示意圖：細線構成的經緯格線與一個金色定位點（待替換為授權活動照片）",
    gallery: [],
    sourceUrl: "", // TODO
    sourceName: "公開資料",
    status: "past",
    featured: false,
    verified: false,
    todo: "確認日期、活動形式、主辦與協辦關係、來源網址",
  },
  {
    id: "2026-tacnc-california",
    title: "北加州台灣會館藝術交流活動",
    titleEn: "Art Exchange at the Taiwanese American Center of Northern California",
    date: "2026-01-01",
    endDate: "",
    dateText: "2026 年",
    location: "北加州台灣會館",
    city: "加州聖荷西",
    country: "美國",
    category: "international",
    partners: ["北加州台灣會館"],
    description:
      "依 2026 年合作活動資料，協會與合作團隊於北加州台灣會館推動藝術交流。活動日期與內容待協會確認後補充。",
    image: "assets/images/placeholders/ph-international-california.svg",
    imageAlt: "示意圖：柔金色地平線與細線圓弧（待替換為授權活動照片）",
    gallery: [],
    sourceUrl: "", // TODO
    sourceName: "2026 合作活動資料",
    status: "past",
    featured: false,
    verified: false,
    todo: "確認日期、活動名稱、來源網址",
  },
  {
    id: "sea-art-education",
    title: "新加坡、馬來西亞海外藝術教育計畫",
    titleEn: "Art Education Programs in Singapore and Malaysia",
    date: "", // TODO：年份不明時留空，網站會歸入「年份待確認」
    endDate: "",
    dateText: "年份待確認",
    location: "新加坡、馬來西亞",
    city: "新加坡／馬來西亞",
    country: "新加坡、馬來西亞",
    category: "international",
    partners: [],
    description:
      "文化部活動介紹提到，合作團隊在新加坡及馬來西亞推動超過 50 場海外藝術教育計畫。此數字為公開資料所介紹的合作團隊成果，並非協會單獨完成的績效。",
    image: "assets/images/placeholders/ph-international-sea.svg",
    imageAlt: "示意圖：鼠尾草綠背景上的兩個相連圓形（待替換為授權活動照片）",
    gallery: [],
    sourceUrl: "", // TODO：貼上文化部活動介紹網址
    sourceName: "文化部活動介紹",
    status: "past",
    featured: false,
    verified: false,
    todo: "確認年份範圍、協會參與角色、來源網址",
  },

  /* ---------- 範本：複製以下整段後，刪除前後的 /* 與 *\/ 符號再修改 ----------
  {
    id: "2027-example-workshop",
    title: "活動名稱",
    titleEn: "",
    date: "2027-03-15",
    endDate: "",
    dateText: "",
    location: "活動地點",
    city: "城市",
    country: "台灣",
    category: "workshop",
    partners: [],
    description: "活動簡介。",
    image: "assets/images/events/2027-example-workshop/cover.jpg",
    imageAlt: "照片內容描述",
    gallery: [
      { src: "assets/images/events/2027-example-workshop/01.jpg", alt: "照片描述", caption: "圖說" },
    ],
    sourceUrl: "",
    sourceName: "",
    status: "auto",
    featured: false,
    verified: true,
    todo: "",
  },
  ------------------------------------------------------------------------ */
];
