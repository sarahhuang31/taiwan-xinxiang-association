/* =====================================================================
 * 網站基本設定 site-config.js
 * ---------------------------------------------------------------------
 * 修改方式：直接在 GitHub 上編輯這個檔案，改完按「Commit changes」。
 * 規則：
 *   1. 文字請放在英文雙引號 "..." 之間。
 *   2. 每一行結尾的英文逗號 , 不要刪除。
 *   3. 留空 "" 代表「尚未設定」，網站會自動隱藏或顯示「待確認」。
 *   4. 標示 TODO 的欄位，代表需要協會確認後再填寫。
 * ===================================================================== */
window.SITE_CONFIG = {
  // 協會名稱
  name: "台灣心香協會",
  nameEn: "Taiwan Xinxiang Association",
  nameEnConfirmed: false, // TODO：英文譯名確認後改成 true，網站將不再顯示「暫定」

  // 網站正式網址（用於分享與 SEO）。啟用 GitHub Pages 後填入，結尾保留斜線 /
  // 例："https://你的帳號.github.io/xinxiang/" 或自訂網域 "https://www.example.org/"
  siteUrl: "", // TODO

  // 網站標語（建議文案，非協會既定宗旨）
  tagline: "讓藝術成為與自己對話的開始。",
  taglineEn: "Let Art Become a Conversation with Yourself.",

  // ---------- 聯絡資訊 ----------
  // 未經協會確認的聯絡方式請保持空白，網站不會公開。
  contact: {
    email: "",   // TODO：例 "contact@example.org"。填入後聯絡表單將啟用寄信功能
    phone: "",   // TODO：例 "04-1234-5678"
    address: "", // TODO：協會登記或通訊地址
    officeHours: "", // TODO：例 "週一至週五 10:00–17:00"
  },

  // 第三方表單服務（選填）。若使用 Formspree 等服務，填入表單送出網址。
  // 例："https://formspree.io/f/xxxxxxx"。填入後，表單會改用此服務送出，而非開啟郵件程式。
  formEndpoint: "",

  // ---------- 社群連結（留空即不顯示） ----------
  social: {
    facebook: "",  // TODO
    instagram: "", // TODO
    youtube: "",   // TODO
    line: "",      // TODO
  },

  // ---------- 支持協會 ----------
  // 捐款資訊需經協會確認並符合相關法規後才可公開。
  donation: {
    enabled: false, // TODO：資料確認後改成 true
    note: "捐款與贊助方式確認中。如有支持意願，歡迎先透過聯絡表單與我們聯繫。",
    bankInfo: "",   // TODO：銀行、戶名與帳號（確認後填寫）
    receiptNote: "",// TODO：收據開立方式
  },

  // ---------- 導覽列（一般不需修改） ----------
  nav: [
    { label: "關於我們", labelEn: "About", href: "about.html", key: "about" },
    { label: "藝術對話", labelEn: "Approach", href: "approach.html", key: "approach" },
    { label: "公益行動", labelEn: "Impact", href: "impact.html", key: "impact" },
    { label: "展覽活動", labelEn: "Exhibitions", href: "events.html", key: "events" },
    { label: "國際交流", labelEn: "Global", href: "global.html", key: "global" },
    { label: "最新消息", labelEn: "News", href: "news.html", key: "news" },
  ],
  ctaNav: { label: "合作聯絡", href: "contact.html", key: "contact" },

  // 英文版：完成翻譯後改成 true，導覽列的 EN 連結會改為正式入口
  englishReady: false,

  // 頁尾著作權年份起始
  copyrightSince: 2026,
};
