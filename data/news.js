/* =====================================================================
 * 最新消息 news.js
 * ---------------------------------------------------------------------
 * 新增消息：複製一整段 { ... }, 貼在清單最上方並修改。網站會依日期自動排序。
 *
 * 欄位說明
 *   id        英文小寫與連字號，不可重複
 *   date      日期 "YYYY-MM-DD"
 *   dateText  顯示用日期（選填，例 "2023 年"）
 *   category  分類，只能填以下其中一個：
 *               "association"   協會消息
 *               "media"         媒體報導
 *               "exhibition"    藝術展覽
 *               "outreach"      公益行動
 *               "international" 國際交流
 *   title     標題
 *   summary   簡介（建議 60–120 字）
 *   image / imageAlt  圖片
 *   sourceUrl 來源連結（外部新聞或活動頁）。留空則不顯示連結
 *   sourceName 來源名稱，例 "文化部藝文活動平台"
 *   link      站內延伸閱讀（選填），例 "events.html#2026-heguang-tongchen"
 *   verified  true / false
 * ===================================================================== */
window.NEWS = [
  {
    id: "2026-website-launch",
    date: "2026-11-06",
    dateText: "",
    category: "association",
    title: "台灣心香協會官方網站上線",
    summary:
      "協會官方網站正式啟用，整理歷年展覽、公益行動與國際交流資料。網站內容將隨資料核對逐步更新，標示「待確認」的項目代表仍在查證中。",
    image: "assets/images/placeholders/ph-news-launch.svg",
    imageAlt: "示意圖：米白底色上的細線方框與柔金色圓點",
    sourceUrl: "",
    sourceName: "",
    link: "about.html",
    verified: true,
  },
  {
    id: "2026-heguang-tongchen-open",
    date: "2026-10-01",
    dateText: "",
    category: "exhibition",
    title: "「和光同塵：宇宙星辰間的神聖意象藝術聯展」於國立臺東生活美學館展出",
    summary:
      "展期 2026 年 10 月 1 日至 10 月 26 日，15 位藝術家、60 餘件作品，以星辰意象探索生命哲學與自我覺察。",
    image: "assets/images/placeholders/ph-exhibition-stars.svg",
    imageAlt: "示意圖：深色背景上的金色星點",
    sourceUrl: "", // TODO
    sourceName: "公開文化活動資料",
    link: "events.html#2026-heguang-tongchen",
    verified: true,
  },
  {
    id: "2025-shuxin-meihao",
    date: "2025-07-01",
    dateText: "2025 年 7 月",
    category: "outreach",
    title: "「舒心．美好藝術成果展」於衛生福利部南港大樓展出",
    summary:
      "展出與衛生福利部雲林教養院藝術成果相關的作品，讓公部門空間成為認識多元創作者的場域。",
    image: "assets/images/placeholders/ph-exhibition-sage.svg",
    imageAlt: "示意圖：鼠尾草綠與霧玫瑰色塊",
    sourceUrl: "https://yleni.mohw.gov.tw/files/雲林教養院院刊-第34期.pdf",
    sourceName: "衛生福利部雲林教養院院刊第 34 期",
    link: "events.html#2025-shuxin-meihao",
    verified: false,
  },
  {
    id: "2023-media-report",
    date: "2023-02-16",
    dateText: "2023 年",
    category: "media",
    title: "媒體報導：「2023 愛的世界」展覽與協會介紹",
    summary:
      "2023 年公開報導介紹協會於鹿港鎮圖書藝文中心舉辦的展覽，報導中記載創辦人為吳淑琴老師、理事長為江薇玲老師（2023 年資料）。",
    image: "assets/images/placeholders/ph-exhibition-rose.svg",
    imageAlt: "示意圖：霧玫瑰色圓形",
    sourceUrl: "", // TODO：貼上報導網址
    sourceName: "公開報導",
    link: "events.html#2023-world-of-love",
    verified: false,
  },
];
