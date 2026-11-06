/**
 * Tailwind 設定檔（僅在重新編譯 CSS 時使用，網站上線不需要 Node.js）
 * 重新編譯指令：npm run build:css
 */
module.exports = {
  content: [
    './*.html',
    './en/**/*.html',
    './assets/js/**/*.js',
    './data/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4ED',      // 主背景
        linen: '#EFEBE1',      // 次背景
        sage: '#D8DFD1',       // 鼠尾草綠
        rose: '#C5A8A0',       // 霧玫瑰（裝飾用）
        'rose-deep': '#7C564E',// 霧玫瑰深色（可作文字，AA）
        gold: '#D0A76B',       // 柔金（僅用於深色背景上的文字或裝飾）
        'gold-deep': '#7A5A2A',// 柔金深色（可作文字，AA）
        forest: '#333B34',     // 深林綠
        ink: '#343734',        // 內文
        muted: '#5B605A',      // 次要文字（AA）
        line: '#D9D4C7',       // 細線
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Noto Sans TC"', '"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Noto Serif TC"', 'serif'],
        latin: ['"DM Sans"', '"Noto Sans TC"', 'sans-serif'],
      },
      maxWidth: {
        site: '84rem',
        prose: '42rem',
      },
      letterSpacing: {
        label: '0.22em',
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/2': '3 / 2',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
      },
    },
  },
  plugins: [],
};
