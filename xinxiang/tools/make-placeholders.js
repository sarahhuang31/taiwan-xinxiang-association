/*
 * 產生版面示意圖（SVG）。執行：node tools/make-placeholders.js
 * 這些圖片只是版面示意，正式上線前請替換為協會授權的照片或作品。
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "assets", "images", "placeholders");
fs.mkdirSync(OUT, { recursive: true });

const C = { paper: "#F7F4ED", linen: "#EFEBE1", sage: "#D8DFD1", rose: "#C5A8A0", gold: "#D0A76B", forest: "#333B34", ink: "#343734" };

function svg(bg, inner, labelColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid slice" width="1200" height="1200">
<rect width="1200" height="1200" fill="${bg}"/>
${inner}
<text x="600" y="1150" text-anchor="middle" font-family="DM Sans, Arial, sans-serif" font-size="22" letter-spacing="6" fill="${labelColor || C.forest}" opacity=".55">示意圖 · PLACEHOLDER</text>
</svg>`;
}

// 簡單的可重現亂數
function rng(seed) { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }

function stars(seed, n, color) {
  const r = rng(seed); let out = "";
  for (let i = 0; i < n; i++) out += `<circle cx="${(r() * 1200).toFixed(1)}" cy="${(r() * 1100).toFixed(1)}" r="${(r() * 2.4 + 0.6).toFixed(2)}" fill="${color}" opacity="${(r() * 0.6 + 0.3).toFixed(2)}"/>`;
  return out;
}

const items = {
  "ph-hero": svg(C.linen, `
    <rect x="160" y="140" width="880" height="920" fill="${C.sage}"/>
    <circle cx="640" cy="520" r="300" fill="${C.rose}" opacity=".75"/>
    <circle cx="520" cy="660" r="220" fill="${C.paper}" opacity=".55"/>
    <path d="M160 820 C 420 700, 760 940, 1040 780" stroke="${C.forest}" stroke-width="2" fill="none"/>
    <circle cx="820" cy="300" r="18" fill="${C.gold}"/>`),
  "ph-about": svg(C.sage, `
    <rect x="240" y="200" width="720" height="800" fill="${C.paper}" opacity=".7"/>
    <path d="M240 600 H960" stroke="${C.forest}" stroke-width="1.5"/>
    <circle cx="600" cy="600" r="210" fill="none" stroke="${C.gold}" stroke-width="3"/>
    <circle cx="600" cy="600" r="40" fill="${C.rose}"/>`),
  "ph-approach-01": svg(C.paper, `
    <path d="M100 700 C 300 380, 520 980, 760 560 S 1100 420, 1150 640" stroke="${C.rose}" stroke-width="60" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M60 820 C 340 640, 600 1000, 1140 780" stroke="${C.sage}" stroke-width="90" fill="none" stroke-linecap="round"/>
    <circle cx="880" cy="320" r="70" fill="${C.gold}" opacity=".85"/>`),
  "ph-approach-02": svg(C.forest, `
    <rect x="200" y="220" width="360" height="460" fill="${C.sage}" opacity=".9"/>
    <rect x="620" y="420" width="380" height="520" fill="${C.rose}" opacity=".85"/>
    <circle cx="600" cy="560" r="12" fill="${C.gold}"/>`, C.paper),
  "ph-exhibition-stars": svg(C.forest, `
    ${stars(7, 140, C.paper)}
    <circle cx="600" cy="560" r="330" fill="none" stroke="${C.gold}" stroke-width="2"/>
    <circle cx="600" cy="560" r="230" fill="none" stroke="${C.gold}" stroke-width="1" opacity=".6"/>
    <path d="M270 560 A330 330 0 0 1 930 560" stroke="${C.gold}" stroke-width="10" fill="none" opacity=".8"/>
    <circle cx="600" cy="560" r="10" fill="${C.gold}"/>`, C.paper),
  "ph-exhibition-sage": svg(C.sage, `
    <rect x="140" y="160" width="560" height="640" fill="${C.paper}" opacity=".8"/>
    <rect x="480" y="420" width="580" height="580" fill="${C.rose}" opacity=".7"/>
    <path d="M140 900 H1060" stroke="${C.forest}" stroke-width="1.5"/>`),
  "ph-exhibition-rose": svg(C.paper, `
    <circle cx="600" cy="540" r="360" fill="${C.rose}" opacity=".55"/>
    <circle cx="760" cy="420" r="160" fill="${C.sage}" opacity=".9"/>
    <path d="M120 980 H1080" stroke="${C.forest}" stroke-width="1.5"/>
    <path d="M600 180 V900" stroke="${C.forest}" stroke-width="1" opacity=".5"/>`),
  "ph-international-paris": svg(C.linen, `
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${150 + i * 112} 120 V1060" stroke="${C.forest}" stroke-width="1" opacity=".18"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<path d="M80 ${180 + i * 120} H1120" stroke="${C.forest}" stroke-width="1" opacity=".18"/>`).join("")}
    <circle cx="486" cy="420" r="26" fill="${C.gold}"/><circle cx="486" cy="420" r="80" fill="none" stroke="${C.gold}" stroke-width="2"/>`),
  "ph-international-california": svg(C.paper, `
    <rect x="0" y="700" width="1200" height="500" fill="${C.sage}"/>
    <path d="M0 700 H1200" stroke="${C.gold}" stroke-width="4"/>
    <circle cx="820" cy="520" r="150" fill="none" stroke="${C.forest}" stroke-width="1.5"/>
    <circle cx="820" cy="520" r="18" fill="${C.rose}"/>`),
  "ph-international-sea": svg(C.sage, `
    <circle cx="470" cy="600" r="220" fill="${C.paper}" opacity=".8"/>
    <circle cx="760" cy="560" r="180" fill="${C.rose}" opacity=".7"/>
    <path d="M470 600 L760 560" stroke="${C.forest}" stroke-width="2"/>
    <circle cx="470" cy="600" r="10" fill="${C.forest}"/><circle cx="760" cy="560" r="10" fill="${C.forest}"/>`),
  "ph-impact-01": svg(C.paper, `
    <path d="M160 300 C 360 200, 560 420, 760 300 S 1040 260, 1080 360" stroke="${C.sage}" stroke-width="120" fill="none" stroke-linecap="round"/>
    <path d="M140 760 C 420 640, 700 900, 1060 720" stroke="${C.rose}" stroke-width="70" fill="none" stroke-linecap="round" opacity=".8"/>`),
  "ph-impact-02": svg(C.linen, `
    <path d="M200 900 C 300 500, 600 300, 1000 260" stroke="${C.gold}" stroke-width="80" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M160 980 C 400 760, 760 700, 1060 760" stroke="${C.forest}" stroke-width="3" fill="none"/>`),
  "ph-impact-03": svg(C.rose, `
    <rect x="220" y="220" width="420" height="420" fill="${C.forest}" opacity=".85"/>
    <rect x="560" y="560" width="420" height="420" fill="${C.paper}" opacity=".85"/>
    <circle cx="640" cy="640" r="14" fill="${C.gold}"/>`),
  "ph-impact-04": svg(C.paper, `
    ${Array.from({ length: 10 }, (_, i) => `<path d="M${120 + i * 106} 160 V1040" stroke="${C.forest}" stroke-width="1" opacity=".12"/>`).join("")}
    <rect x="332" y="372" width="424" height="424" fill="${C.sage}"/>
    <rect x="544" y="584" width="318" height="318" fill="${C.rose}" opacity=".6"/>`),
  "ph-news-launch": svg(C.paper, `
    <rect x="260" y="260" width="680" height="680" fill="none" stroke="${C.forest}" stroke-width="1.5"/>
    <rect x="320" y="320" width="560" height="560" fill="${C.sage}" opacity=".6"/>
    <circle cx="600" cy="600" r="22" fill="${C.gold}"/>`),
};

for (const [name, content] of Object.entries(items)) {
  fs.writeFileSync(path.join(OUT, name + ".svg"), content.trim() + "\n");
}
console.log("已產生", Object.keys(items).length, "張示意圖 →", OUT);
