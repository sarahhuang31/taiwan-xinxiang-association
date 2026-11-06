/* =====================================================================
 * 國際交流地區 exchanges.js
 * ---------------------------------------------------------------------
 * 「國際交流」頁的地區分布圖與案例。
 * 每個地點都必須有可查證的資料來源；沒有來源時請把 verified 設為 false。
 *
 * 欄位說明
 *   id          英文小寫，不可重複
 *   region      地區名稱
 *   regionEn    英文名稱
 *   lat / lng   緯度／經度（用於地圖定位，可在 Google 地圖右鍵查詢）
 *   summary     交流概述
 *   cases       案例清單 [{ title, year, eventId }]，eventId 對應 events.js 的 id（選填）
 *   sourceUrl / sourceName  資料來源
 *   verified    true / false
 * ===================================================================== */
window.EXCHANGES = [
  {
    id: "taiwan",
    region: "台灣",
    regionEn: "Taiwan",
    lat: 23.7,
    lng: 121.0,
    summary:
      "協會的根據地。展覽足跡包含彰化鹿港、臺北南港與臺東，並於中部的教養、養護與榮民機構推動藝術陪伴。",
    cases: [
      { title: "2023 愛的世界", year: "2023", eventId: "2023-world-of-love" },
      { title: "舒心．美好藝術成果展", year: "2025", eventId: "2025-shuxin-meihao" },
      { title: "和光同塵：宇宙星辰間的神聖意象藝術聯展", year: "2026", eventId: "2026-heguang-tongchen" },
    ],
    sourceUrl: "",
    sourceName: "公開報導與文化活動資料",
    verified: true,
  },
  {
    id: "singapore",
    region: "新加坡",
    regionEn: "Singapore",
    lat: 1.35,
    lng: 103.82,
    summary:
      "文化部活動介紹提到，合作團隊在新加坡及馬來西亞推動超過 50 場海外藝術教育計畫（兩地合計，為合作團隊成果）。",
    cases: [{ title: "海外藝術教育計畫", year: "年份待確認", eventId: "sea-art-education" }],
    sourceUrl: "", // TODO
    sourceName: "文化部活動介紹",
    verified: false,
  },
  {
    id: "malaysia",
    region: "馬來西亞",
    regionEn: "Malaysia",
    lat: 3.14,
    lng: 101.69,
    summary:
      "與新加坡同屬文化部活動介紹中提及的海外藝術教育範圍。實際城市與合作單位待協會確認。",
    cases: [{ title: "海外藝術教育計畫", year: "年份待確認", eventId: "sea-art-education" }],
    sourceUrl: "", // TODO
    sourceName: "文化部活動介紹",
    verified: false,
  },
  {
    id: "france",
    region: "法國",
    regionEn: "France",
    lat: 48.86,
    lng: 2.35,
    summary: "公開資料提及 2025 年於巴黎 IESA 藝術文化管理學院進行藝術交流。",
    cases: [{ title: "巴黎 IESA 藝術交流", year: "2025", eventId: "2025-iesa-paris" }],
    sourceUrl: "", // TODO
    sourceName: "公開資料",
    verified: false,
  },
  {
    id: "usa",
    region: "美國",
    regionEn: "United States",
    lat: 37.34,
    lng: -121.89,
    summary: "依 2026 年合作活動資料，於加州北加州台灣會館推動藝術交流。",
    cases: [{ title: "北加州台灣會館藝術交流", year: "2026", eventId: "2026-tacnc-california" }],
    sourceUrl: "", // TODO
    sourceName: "2026 合作活動資料",
    verified: false,
  },
];
