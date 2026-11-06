/* =====================================================================
 * 公益行動與合作紀錄 projects.js
 * ---------------------------------------------------------------------
 * 「公益行動」頁面的案例資料。
 * 重要原則：
 *   - 不可填寫未經確認的參與人數、服務成果、療效或受益者故事。
 *   - 涉及服務對象的照片，須取得本人或法定代理人同意，並避免可辨識臉部。
 *
 * 欄位說明
 *   id           英文小寫與連字號，不可重複
 *   title        案例名稱
 *   institution  合作場域／機構
 *   period       時間（文字，例 "2025 年"、"時間待確認"）
 *   year         排序與時間軸使用的年份數字；不明時填 null
 *   partners     合作對象清單
 *   summary      內容摘要
 *   image / imageAlt / gallery   照片（同 events.js）
 *   sourceUrl / sourceName       資料來源
 *   relatedEventId               相關活動 id（選填，會連到展覽活動頁）
 *   verified     true / false
 *   todo         待辦說明（網站不顯示）
 * ===================================================================== */
window.PROJECTS = [
  {
    id: "yunlin-institution",
    title: "雲林教養院藝術陪伴",
    institution: "衛生福利部雲林教養院",
    period: "時間待確認（2025 年舉辦成果展）",
    year: 2025,
    partners: ["衛生福利部雲林教養院"],
    summary:
      "依公開文化活動資料，協會與合作團隊曾參與雲林教養院的藝術相關計畫。2025 年 7 月於衛生福利部南港大樓展出的「舒心．美好藝術成果展」，與該院藝術成果有關。",
    image: "assets/images/placeholders/ph-impact-01.svg",
    imageAlt: "示意圖：畫紙上的鼠尾草綠色塊與筆觸（待替換為授權照片）",
    gallery: [],
    sourceUrl: "https://yleni.mohw.gov.tw/files/雲林教養院院刊-第34期.pdf",
    sourceName: "衛生福利部雲林教養院院刊第 34 期",
    relatedEventId: "2025-shuxin-meihao",
    verified: false,
    todo: "確認合作期間、協會角色、活動形式；照片須取得授權與當事人同意",
  },
  {
    id: "changhua-elderly-care",
    title: "彰化老人養護中心藝術活動",
    institution: "衛生福利部彰化老人養護中心",
    period: "時間待確認",
    year: null,
    partners: ["衛生福利部彰化老人養護中心"],
    summary:
      "依公開文化活動資料，協會與合作團隊曾於彰化老人養護中心參與藝術相關計畫，以色彩與創作陪伴長者表達感受。活動細節待協會提供資料後補充。",
    image: "assets/images/placeholders/ph-impact-02.svg",
    imageAlt: "示意圖：柔金色與米白色的抽象筆觸（待替換為授權照片）",
    gallery: [],
    sourceUrl: "", // TODO
    sourceName: "公開文化活動資料",
    relatedEventId: "",
    verified: false,
    todo: "確認時間、活動名稱、來源網址",
  },
  {
    id: "yunlin-veterans-home",
    title: "雲林榮譽國民之家藝術活動",
    institution: "雲林榮譽國民之家",
    period: "時間待確認",
    year: null,
    partners: ["雲林榮譽國民之家"],
    summary:
      "依公開文化活動資料，協會與合作團隊曾於雲林榮譽國民之家參與藝術相關計畫。活動細節待協會提供資料後補充。",
    image: "assets/images/placeholders/ph-impact-03.svg",
    imageAlt: "示意圖：霧玫瑰色與深林綠的幾何構圖（待替換為授權照片）",
    gallery: [],
    sourceUrl: "", // TODO
    sourceName: "公開文化活動資料",
    relatedEventId: "",
    verified: false,
    todo: "確認時間、活動名稱、來源網址",
  },
  {
    id: "schools-communities",
    title: "學校、公共機構與社區",
    institution: "其他學校、公共機構與社區",
    period: "時間待確認",
    year: null,
    partners: [],
    summary:
      "協會與合作團隊亦曾於學校、公共機構與社區推動藝術活動。各場域名稱與內容待協會核對後逐筆補充。",
    image: "assets/images/placeholders/ph-impact-04.svg",
    imageAlt: "示意圖：細線網格與淡綠色塊（待替換為授權照片）",
    gallery: [],
    sourceUrl: "",
    sourceName: "",
    relatedEventId: "",
    verified: false,
    todo: "逐一列出已確認的學校與社區合作，每筆附來源",
  },
];
