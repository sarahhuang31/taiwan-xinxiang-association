/* =====================================================================
 * 台灣心香協會｜網站主程式 main.js
 * ---------------------------------------------------------------------
 * 負責：頁首頁尾、行動版選單、捲動顯現、以及從 data/*.js 產生頁面內容。
 * 一般更新內容請修改 data 資料夾，不需要修改這個檔案。
 * ===================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var CONFIG = window.SITE_CONFIG || {};
  var EVENTS = window.EVENTS || [];
  var NEWS = window.NEWS || [];
  var PROJECTS = window.PROJECTS || [];
  var TEAM = window.TEAM || [];
  var EXCHANGES = window.EXCHANGES || [];

  var body = document.body;
  var ROOT = (body && body.getAttribute("data-root")) || ""; // en/ 子頁面為 "../"
  var PAGE = (body && body.getAttribute("data-page")) || "";

  /* ---------- 分類對照 ---------- */
  var EVENT_CATEGORIES = {
    exhibition: { zh: "藝術展覽", en: "Art Exhibition" },
    workshop: { zh: "藝術工作坊", en: "Art Workshop" },
    outreach: { zh: "公益行動", en: "Community Outreach" },
    international: { zh: "國際交流", en: "International Exchange" },
  };
  var NEWS_CATEGORIES = {
    association: "協會消息",
    media: "媒體報導",
    exhibition: "藝術展覽",
    outreach: "公益行動",
    international: "國際交流",
  };
  var STATUS_LABEL = { upcoming: "即將舉行", ongoing: "展出中", past: "已結束" };

  /* ---------- 工具函式 ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // 站內路徑加上前綴；外部網址保持不變
  function url(path) {
    if (!path) return "";
    if (/^(https?:|mailto:|tel:|#|data:)/.test(path)) return path;
    return ROOT + path;
  }

  function isExternal(href) { return /^https?:/.test(href || ""); }

  function parseDate(s) {
    if (!s) return null;
    var p = String(s).split("-");
    if (p.length < 3) return null;
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function fmt(d) {
    return d.getFullYear() + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0");
  }

  function eventDateText(ev) {
    if (ev.dateText) return ev.dateText;
    var s = parseDate(ev.date);
    if (!s) return "日期待確認";
    var e = parseDate(ev.endDate);
    if (!e) return fmt(s);
    var endStr = e.getFullYear() === s.getFullYear() ? fmt(e).slice(5) : fmt(e);
    return fmt(s) + " – " + endStr;
  }

  function eventYear(ev) {
    var d = parseDate(ev.date);
    return d ? String(d.getFullYear()) : "unknown";
  }

  function today() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  function eventStatus(ev) {
    if (ev.status && ev.status !== "auto") return ev.status;
    var s = parseDate(ev.date);
    if (!s) return "past";
    var e = parseDate(ev.endDate) || s;
    var t = today();
    if (t < s) return "upcoming";
    if (t <= e) return "ongoing";
    return "past";
  }

  function sortByDateDesc(list) {
    return list.slice().sort(function (a, b) {
      var da = parseDate(a.date), db = parseDate(b.date);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db - da;
    });
  }

  function todoBadge(item, label) {
    if (item && item.verified === false) {
      return '<span class="badge-todo" title="此筆資料仍在核對中">' + esc(label || "資料待確認") + "</span>";
    }
    return "";
  }

  function picture(src, alt, extraClass) {
    if (!src) {
      return '<div class="flex h-full w-full items-center justify-center bg-linen text-xs tracking-wider text-muted">圖片待補</div>';
    }
    return '<img src="' + esc(url(src)) + '" alt="' + esc(alt || "") + '" loading="lazy" decoding="async" class="' + (extraClass || "") + '">';
  }

  function sourceLink(item, cls) {
    if (item.sourceUrl) {
      return '<a class="' + (cls || "link-arrow") + '" href="' + esc(item.sourceUrl) + '" target="_blank" rel="noopener noreferrer">資料來源：' +
        esc(item.sourceName || "外部連結") + '<span class="sr-only">（另開新視窗）</span></a>';
    }
    if (item.sourceName) {
      return '<span class="text-xs text-muted">資料來源：' + esc(item.sourceName) + "（連結待補）</span>";
    }
    return "";
  }

  /* ---------- 頁首 ---------- */
  var LOGO_SVG =
    '<svg aria-hidden="true" viewBox="0 0 40 40" class="h-9 w-9 shrink-0" fill="none">' +
    '<circle cx="20" cy="20" r="18.5" stroke="#333B34" stroke-width="1"/>' +
    '<path d="M20 31c-5.5-3.2-8-7.2-8-11.2 0-3 2.2-5.3 5-5.3 1.4 0 2.4.6 3 1.5.6-.9 1.6-1.5 3-1.5 2.8 0 5 2.3 5 5.3 0 4-2.5 8-8 11.2Z" stroke="#333B34" stroke-width="1"/>' +
    '<circle cx="20" cy="9.5" r="1.6" fill="#D0A76B"/></svg>';

  function renderHeader() {
    var el = $("#site-header");
    if (!el) return;
    var nav = CONFIG.nav || [];
    var cta = CONFIG.ctaNav || { label: "合作聯絡", href: "contact.html", key: "contact" };

    var desktopLinks = nav.map(function (n) {
      var cur = n.key === PAGE ? ' aria-current="page"' : "";
      return '<li><a class="nav-link text-[0.92rem] tracking-[0.12em] text-forest no-underline" href="' + esc(url(n.href)) + '"' + cur + ">" + esc(n.label) + "</a></li>";
    }).join("");

    var mobileLinks = nav.concat([cta]).map(function (n, i) {
      var cur = n.key === PAGE ? ' aria-current="page"' : "";
      return '<li class="border-b border-line"><a class="flex items-baseline justify-between py-5 font-serif text-2xl text-forest no-underline" href="' +
        esc(url(n.href)) + '"' + cur + ">" + esc(n.label) +
        '<span class="font-latin text-xs tracking-label text-muted">' + String(i + 1).padStart(2, "0") + "</span></a></li>";
    }).join("");

    var enLabel = CONFIG.englishReady ? "EN" : "EN";
    var enTitle = CONFIG.englishReady ? "English" : "English version (in preparation)";

    el.innerHTML =
      '<div class="container-site flex h-[72px] items-center justify-between gap-6">' +
        '<a href="' + esc(url("index.html")) + '" class="flex items-center gap-3 no-underline" aria-label="' + esc(CONFIG.name) + ' 首頁">' +
          LOGO_SVG +
          '<span class="flex flex-col leading-tight">' +
            '<span class="font-serif text-[1.05rem] tracking-[0.18em] text-forest">' + esc(CONFIG.name) + "</span>" +
            '<span class="font-latin text-[0.58rem] uppercase tracking-[0.2em] text-muted">' + esc(CONFIG.nameEn) + "</span>" +
          "</span></a>" +
        '<nav aria-label="主要導覽" class="hidden lg:block"><ul class="flex items-center gap-7">' + desktopLinks + "</ul></nav>" +
        '<div class="flex items-center gap-4">' +
          '<a href="' + esc(url("en/index.html")) + '" lang="en" title="' + esc(enTitle) + '" class="hidden font-latin text-xs tracking-label text-muted no-underline hover:text-forest sm:inline">' + enLabel + "</a>" +
          '<a href="' + esc(url(cta.href)) + '" class="btn-ghost hidden !px-4 !py-2 lg:inline-flex"' + (cta.key === PAGE ? ' aria-current="page"' : "") + ">" + esc(cta.label) + "</a>" +
          '<button type="button" id="menu-toggle" class="flex h-11 w-11 items-center justify-center lg:hidden" aria-expanded="false" aria-controls="mobile-menu">' +
            '<span class="sr-only">開啟選單</span>' +
            '<svg aria-hidden="true" width="26" height="14" viewBox="0 0 26 14"><path d="M0 1h26M8 13h18" stroke="#333B34" stroke-width="1.4"/></svg>' +
          "</button>" +
        "</div>" +
      "</div>";
    var panelHtml =
      '<div id="mobile-menu" class="mobile-panel fixed inset-0 z-50 overflow-y-auto bg-paper lg:hidden" hidden>' +
        '<div class="container-site flex h-[72px] items-center justify-between">' +
          '<span class="font-serif tracking-[0.18em] text-forest">' + esc(CONFIG.name) + "</span>" +
          '<button type="button" id="menu-close" class="flex h-11 w-11 items-center justify-center"><span class="sr-only">關閉選單</span>' +
          '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20"><path d="M2 2l16 16M18 2 2 18" stroke="#333B34" stroke-width="1.4"/></svg></button>' +
        "</div>" +
        '<nav aria-label="行動版導覽" class="container-site pb-16 pt-6"><ul>' + mobileLinks + "</ul>" +
        '<p class="mt-10 font-display text-xl italic text-muted" lang="en">' + esc(CONFIG.taglineEn) + "</p>" +
        '<a href="' + esc(url("en/index.html")) + '" lang="en" class="mt-6 inline-block font-latin text-xs tracking-label text-muted">ENGLISH</a>' +
        "</nav></div>";
    var old = $("#mobile-menu");
    if (old) old.remove();
    document.body.insertAdjacentHTML("beforeend", panelHtml);

    setupMobileMenu();

    var onScroll = function () { el.classList.toggle("is-scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupMobileMenu() {
    var toggle = $("#menu-toggle"), panel = $("#mobile-menu"), close = $("#menu-close");
    if (!toggle || !panel) return;
    function open() {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = panel.querySelector("a, button");
      requestAnimationFrame(function () { if (first) first.focus(); });
    }
    function shut() {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      toggle.focus();
    }
    toggle.addEventListener("click", open);
    close.addEventListener("click", shut);
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") shut();
      if (e.key === "Tab") { // 焦點維持在選單內
        var f = $all("a, button", panel);
        var firstEl = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    });
  }

  /* ---------- 頁尾 ---------- */
  function renderFooter() {
    var el = $("#site-footer");
    if (!el) return;
    var c = CONFIG.contact || {};
    var s = CONFIG.social || {};
    var year = new Date().getFullYear();
    var since = CONFIG.copyrightSince || year;

    var contactLines = [];
    if (c.email) contactLines.push('<li><a class="text-paper/90 hover:text-gold" href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>");
    if (c.phone) contactLines.push('<li><a class="text-paper/90 no-underline hover:text-gold" href="tel:' + esc(c.phone.replace(/[^0-9+]/g, "")) + '">' + esc(c.phone) + "</a></li>");
    if (c.address) contactLines.push('<li class="text-paper/80">' + esc(c.address) + "</li>");
    if (!contactLines.length) contactLines.push('<li class="text-paper/75">聯絡方式確認中，請使用<a class="text-paper underline hover:text-gold" href="' + esc(url("contact.html")) + '">聯絡表單頁</a>了解洽詢方式。</li>');

    var socialNames = { facebook: "Facebook", instagram: "Instagram", youtube: "YouTube", line: "LINE" };
    var socials = Object.keys(socialNames).filter(function (k) { return s[k]; }).map(function (k) {
      return '<li><a class="font-latin text-xs tracking-label text-paper/85 no-underline hover:text-gold" href="' + esc(s[k]) + '" target="_blank" rel="noopener noreferrer">' + socialNames[k].toUpperCase() + '<span class="sr-only">（另開新視窗）</span></a></li>';
    }).join("");

    var navLinks = (CONFIG.nav || []).concat([CONFIG.ctaNav || {}, { label: "隱私權政策", href: "privacy.html" }]).map(function (n) {
      return '<li><a class="text-paper/85 no-underline hover:text-gold hover:underline" href="' + esc(url(n.href)) + '">' + esc(n.label) + "</a></li>";
    }).join("");

    el.innerHTML =
      '<div class="container-site py-20">' +
        '<div class="grid gap-14 lg:grid-cols-12">' +
          '<div class="lg:col-span-5">' +
            '<p class="eyebrow-light">' + esc(CONFIG.nameEn) + (CONFIG.nameEnConfirmed ? "" : "（暫定英文名稱）") + "</p>" +
            '<p class="mt-5 font-serif text-3xl tracking-[0.16em] text-paper">' + esc(CONFIG.name) + "</p>" +
            '<p class="mt-6 max-w-sm font-serif text-lg leading-loose text-paper/85">' + esc(CONFIG.tagline) + "</p>" +
            '<p class="mt-1 font-display text-lg italic text-gold" lang="en">' + esc(CONFIG.taglineEn) + "</p>" +
          "</div>" +
          '<nav aria-label="頁尾導覽" class="lg:col-span-3"><p class="eyebrow-light">Sitemap</p><ul class="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm lg:grid-cols-1">' + navLinks + "</ul></nav>" +
          '<div class="lg:col-span-4"><p class="eyebrow-light">Contact</p><ul class="mt-5 space-y-3 text-sm">' + contactLines.join("") + "</ul>" +
            (socials ? '<ul class="mt-8 flex flex-wrap gap-6">' + socials + "</ul>" : "") +
          "</div>" +
        "</div>" +
        '<div class="mt-16 flex flex-col gap-4 border-t border-paper/20 pt-8 text-xs leading-relaxed text-paper/70 sm:flex-row sm:justify-between">' +
          "<p>© " + (since < year ? since + "–" : "") + year + " " + esc(CONFIG.name) + "　保留所有權利</p>" +
          "<p>網站中標示「示意圖」的圖片為版面示意，非活動紀實照片。</p>" +
        "</div>" +
      "</div>";
  }

  /* ---------- 設定值綁定：<span data-config="nameEn"></span> ---------- */
  function bindConfig() {
    $all("[data-config]").forEach(function (el) {
      var keys = el.getAttribute("data-config").split(".");
      var v = keys.reduce(function (o, k) { return o ? o[k] : undefined; }, CONFIG);
      if (v) el.textContent = v;
    });
    $all("[data-if-unconfirmed-name]").forEach(function (el) { el.hidden = !!CONFIG.nameEnConfirmed; });
  }

  /* ---------- 捲動顯現 ---------- */
  function setupReveal() {
    var els = $all(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduce) {
      els.forEach(function (e) { e.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* =================================================================
   * 首頁：精選展覽
   * ================================================================= */
  function renderFeaturedEvents() {
    var el = $("#featured-events");
    if (!el) return;
    var list = sortByDateDesc(EVENTS.filter(function (e) { return e.featured; })).slice(0, 3);
    if (!list.length) { el.innerHTML = '<p class="text-muted">展覽資料整理中。</p>'; return; }

    var lead = list[0], rest = list.slice(1);
    function meta(ev) {
      return '<p class="eyebrow">' + esc(eventDateText(ev)) + "　·　" + esc(STATUS_LABEL[eventStatus(ev)]) + "</p>";
    }
    var html =
      '<article class="group reveal lg:col-span-7">' +
        '<a href="' + esc(url("events.html#" + lead.id)) + '" class="block no-underline">' +
          '<div class="figure-frame aspect-4/5 sm:aspect-3/2 lg:aspect-4/5">' + picture(lead.image, lead.imageAlt) + "</div>" +
          '<div class="mt-6">' + meta(lead) +
            '<h3 class="mt-3 text-2xl sm:text-3xl group-hover:underline">' + esc(lead.title) + "</h3>" +
            '<p class="mt-2 text-sm text-muted">' + esc(lead.location) + "</p>" +
            '<p class="mt-4 max-w-xl text-[0.95rem] leading-loose">' + esc(lead.description) + "</p>" +
            '<div class="mt-3">' + todoBadge(lead) + "</div>" +
          "</div></a></article>";

    html += '<div class="flex flex-col gap-14 lg:col-span-5 lg:pt-24">' + rest.map(function (ev, i) {
      return '<article class="group reveal">' +
        '<a href="' + esc(url("events.html#" + ev.id)) + '" class="block no-underline">' +
          '<div class="figure-frame ' + (i === 0 ? "aspect-3/2" : "aspect-square") + '">' + picture(ev.image, ev.imageAlt) + "</div>" +
          '<div class="mt-5">' + meta(ev) +
            '<h3 class="mt-3 text-xl group-hover:underline">' + esc(ev.title) + "</h3>" +
            '<p class="mt-2 text-sm text-muted">' + esc(ev.location) + "</p>" +
            '<div class="mt-3">' + todoBadge(ev) + "</div>" +
          "</div></a></article>";
    }).join("") + "</div>";

    el.innerHTML = html;
  }

  /* 首頁：公益行動場域清單 */
  function renderHomeImpact() {
    var el = $("#home-impact");
    if (!el) return;
    el.innerHTML = PROJECTS.map(function (p, i) {
      return '<li class="reveal border-t border-forest/20">' +
        '<a href="' + esc(url("impact.html#case-" + p.id)) + '" class="group flex items-baseline gap-6 py-6 no-underline">' +
          '<span class="font-display text-2xl text-gold-deep">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="flex-1"><span class="block font-serif text-xl text-forest group-hover:underline">' + esc(p.institution) + "</span>" +
          '<span class="mt-1 block text-sm text-muted">' + esc(p.period) + "</span></span>" +
          '<span aria-hidden="true" class="text-forest transition-transform group-hover:translate-x-1">→</span>' +
        "</a></li>";
    }).join("");
  }

  /* 首頁：最新消息 */
  function renderHomeNews() {
    var el = $("#home-news");
    if (!el) return;
    var list = sortByDateDesc(NEWS).slice(0, 3);
    el.innerHTML = list.map(function (n) { return newsRow(n, true); }).join("");
  }

  /* =================================================================
   * 地區分布圖（首頁與國際交流頁共用）
   * 以經緯度投影定位，地圖中心設在太平洋（約東經 150 度）
   * ================================================================= */
  var LABEL_SIDE = { malaysia: "left", singapore: "right", taiwan: "right", france: "right", usa: "left" };

  function project(lat, lng) {
    var x = (((lng + 30) % 360) + 360) % 360 / 360 * 1000;
    var y = (75 - lat) / 135 * 500;
    return { x: x, y: y };
  }

  function renderMap(el, opts) {
    if (!el || !EXCHANGES.length) return;
    opts = opts || {};
    var dark = !!opts.dark;
    var lineColor = dark ? "rgba(247,244,237,.16)" : "#D9D4C7";
    var textColor = dark ? "#F7F4ED" : "#333B34";
    var subColor = dark ? "#D8DFD1" : "#5B605A";
    var g = "";
    for (var lng = -30; lng <= 330; lng += 30) {
      var px = project(0, lng).x;
      g += '<line x1="' + px + '" y1="0" x2="' + px + '" y2="500" stroke="' + lineColor + '" stroke-width="1"/>';
    }
    for (var lat = 60; lat >= -45; lat -= 15) {
      var py = project(lat, 0).y;
      g += '<line x1="0" y1="' + py + '" x2="1000" y2="' + py + '" stroke="' + lineColor + '" stroke-width="' + (lat === 0 ? 1.4 : 1) + '"' + (lat === 0 ? "" : ' stroke-dasharray="2 6"') + "/>";
    }
    var eq = project(0, -30).y;
    g += '<text x="8" y="' + (eq - 8) + '" font-size="11" fill="' + subColor + '" font-family="DM Sans, sans-serif" letter-spacing="2">EQUATOR</text>';

    var home = EXCHANGES.filter(function (r) { return r.id === "taiwan"; })[0];
    var hp = home ? project(home.lat, home.lng) : null;
    var arcs = "", pts = "";
    EXCHANGES.forEach(function (r) {
      var p = project(r.lat, r.lng);
      if (hp && r.id !== "taiwan") {
        var mx = (hp.x + p.x) / 2, my = Math.min(hp.y, p.y) - Math.abs(hp.x - p.x) * 0.28 - 20;
        arcs += '<path d="M' + hp.x + " " + hp.y + " Q" + mx + " " + my + " " + p.x + " " + p.y + '" fill="none" stroke="#D0A76B" stroke-width="1.2" stroke-dasharray="' + (r.verified ? "0" : "4 5") + '" opacity=".85"/>';
      }
      var side = LABEL_SIDE[r.id] || "right";
      var tx = side === "left" ? p.x - 16 : p.x + 16;
      var anchor = side === "left" ? "end" : "start";
      var dy = r.id === "malaysia" ? -10 : r.id === "singapore" ? 14 : 4;
      pts += '<a class="map-point" href="' + esc(opts.linkBase || "") + "#region-" + esc(r.id) + '" aria-label="' + esc(r.region) + '">' +
        '<circle class="map-pulse" cx="' + p.x + '" cy="' + p.y + '" r="6" fill="#D0A76B"/>' +
        '<circle class="map-dot" cx="' + p.x + '" cy="' + p.y + '" r="6" fill="' + (r.id === "taiwan" ? "#D0A76B" : textColor) + '" stroke="' + (dark ? "#333B34" : "#F7F4ED") + '" stroke-width="2"/>' +
        '<text x="' + tx + '" y="' + (p.y + dy) + '" text-anchor="' + anchor + '" font-size="17" fill="' + textColor + '" font-family="Noto Serif TC, serif" letter-spacing="2">' + esc(r.region) + "</text>" +
        '<text x="' + tx + '" y="' + (p.y + dy + 17) + '" text-anchor="' + anchor + '" font-size="10.5" fill="' + subColor + '" font-family="DM Sans, sans-serif" letter-spacing="1.6">' + esc(r.regionEn.toUpperCase()) + "</text></a>";
    });

    el.innerHTML =
      '<svg viewBox="0 30 1000 330" class="h-auto w-full" role="img" aria-labelledby="map-title-' + el.id + '">' +
      '<title id="map-title-' + el.id + '">國際交流地區分布：' + esc(EXCHANGES.map(function (r) { return r.region; }).join("、")) + "</title>" +
      g + arcs + pts + "</svg>";
  }

  function renderHomeRegions() {
    var el = $("#home-regions");
    if (!el) return;
    el.innerHTML = EXCHANGES.map(function (r, i) {
      return '<li class="flex items-baseline gap-5 border-b border-paper/15 py-4">' +
        '<span class="font-latin text-xs tracking-label text-gold">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<a href="' + esc(url("global.html#region-" + r.id)) + '" class="flex flex-1 items-baseline justify-between gap-4 text-paper no-underline hover:text-gold">' +
          '<span class="font-serif text-lg tracking-[0.12em]">' + esc(r.region) + "</span>" +
          '<span class="font-latin text-[0.7rem] tracking-label text-sage" lang="en">' + esc(r.regionEn.toUpperCase()) + "</span></a></li>";
    }).join("");
  }

  /* =================================================================
   * 國際交流頁：地區案例
   * ================================================================= */
  function renderExchangeRegions() {
    var el = $("#exchange-regions");
    if (!el) return;
    el.innerHTML = EXCHANGES.map(function (r, i) {
      var cases = (r.cases || []).map(function (c) {
        var label = esc(c.title) + '<span class="ml-3 font-latin text-xs text-muted">' + esc(c.year || "") + "</span>";
        return '<li class="border-b border-line py-3">' +
          (c.eventId ? '<a class="no-underline hover:underline" href="' + esc(url("events.html#" + c.eventId)) + '">' + label + "</a>" : label) + "</li>";
      }).join("");
      return '<article id="region-' + esc(r.id) + '" class="reveal grid scroll-mt-28 gap-8 border-t border-line py-14 lg:grid-cols-12">' +
        '<header class="lg:col-span-4">' +
          '<p class="eyebrow">' + String(i + 1).padStart(2, "0") + " / " + esc(r.regionEn) + "</p>" +
          '<h3 class="mt-3 text-3xl">' + esc(r.region) + "</h3>" +
          '<div class="mt-4">' + todoBadge(r) + "</div>" +
        "</header>" +
        '<div class="lg:col-span-8">' +
          '<p class="text-[1.02rem] leading-loose">' + esc(r.summary) + "</p>" +
          (cases ? '<h4 class="mt-8 font-sans text-sm tracking-[0.14em] text-muted">交流案例</h4><ul class="mt-2">' + cases + "</ul>" : "") +
          '<div class="mt-6">' + sourceLink(r) + "</div>" +
        "</div></article>";
    }).join("");
  }

  /* =================================================================
   * 展覽活動頁：篩選資料庫
   * ================================================================= */
  function eventCard(ev, i) {
    var ratios = ["aspect-4/5", "aspect-3/2", "aspect-square"];
    var st = eventStatus(ev);
    var cat = EVENT_CATEGORIES[ev.category] || { zh: ev.category, en: "" };
    return '<article class="group reveal flex flex-col" id="card-' + esc(ev.id) + '">' +
      '<button type="button" class="block text-left" data-open-event="' + esc(ev.id) + '" aria-haspopup="dialog">' +
        '<div class="figure-frame ' + ratios[i % 3] + '">' + picture(ev.image, ev.imageAlt) + "</div>" +
        '<div class="mt-5">' +
          '<p class="eyebrow">' + esc(cat.en) + "　·　" + esc(STATUS_LABEL[st]) + "</p>" +
          '<h3 class="mt-3 text-xl leading-snug group-hover:underline">' + esc(ev.title) + "</h3>" +
        "</div>" +
      "</button>" +
      '<dl class="mt-4 grid grid-cols-[3.5rem_1fr] gap-y-1 text-sm">' +
        '<dt class="text-muted">日期</dt><dd>' + esc(eventDateText(ev)) + "</dd>" +
        '<dt class="text-muted">地點</dt><dd>' + esc(ev.location) + "</dd>" +
      "</dl>" +
      '<div class="mt-4 flex flex-wrap items-center gap-3">' +
        '<span class="badge">' + esc(cat.zh) + "</span>" + todoBadge(ev) +
      "</div></article>";
  }

  function renderEventsApp() {
    var app = $("#events-app");
    if (!app) return;
    var yearWrap = $("#filter-years"), catWrap = $("#filter-categories");
    var upcomingEl = $("#events-upcoming"), pastEl = $("#events-past"), countEl = $("#events-count");
    var state = { year: "all", category: "all" };

    var years = [];
    EVENTS.forEach(function (e) { var y = eventYear(e); if (years.indexOf(y) < 0) years.push(y); });
    years.sort(function (a, b) { return a === "unknown" ? 1 : b === "unknown" ? -1 : Number(b) - Number(a); });

    function chip(group, value, label, pressed) {
      return '<button type="button" class="chip" data-group="' + group + '" data-value="' + esc(value) + '" aria-pressed="' + (pressed ? "true" : "false") + '">' + esc(label) + "</button>";
    }
    yearWrap.innerHTML = chip("year", "all", "全部年份", true) + years.map(function (y) { return chip("year", y, y === "unknown" ? "年份待確認" : y); }).join("");
    catWrap.innerHTML = chip("category", "all", "全部類別", true) + Object.keys(EVENT_CATEGORIES).map(function (k) {
      return chip("category", k, EVENT_CATEGORIES[k].zh + " " + EVENT_CATEGORIES[k].en);
    }).join("");

    function update() {
      var list = sortByDateDesc(EVENTS).filter(function (e) {
        return (state.year === "all" || eventYear(e) === state.year) && (state.category === "all" || e.category === state.category);
      });
      var upcoming = list.filter(function (e) { var s = eventStatus(e); return s === "upcoming" || s === "ongoing"; }).reverse();
      var past = list.filter(function (e) { return eventStatus(e) === "past"; });
      upcomingEl.innerHTML = upcoming.length
        ? upcoming.map(eventCard).join("")
        : '<p class="col-span-full border-y border-line py-10 text-center text-muted">目前沒有已公布的近期活動。新活動確認後將在此發布，也歡迎<a class="text-forest underline" href="' + esc(url("contact.html")) + '">與我們聯繫</a>。</p>';
      pastEl.innerHTML = past.length
        ? past.map(eventCard).join("")
        : '<p class="col-span-full border-y border-line py-10 text-center text-muted">此條件下沒有活動資料。</p>';
      countEl.textContent = "共 " + list.length + " 筆活動";
      setupReveal();
    }

    app.addEventListener("click", function (e) {
      var b = e.target.closest("[data-group]");
      if (b) {
        state[b.getAttribute("data-group")] = b.getAttribute("data-value");
        $all('[data-group="' + b.getAttribute("data-group") + '"]', app).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        update();
        return;
      }
      var o = e.target.closest("[data-open-event]");
      if (o) openEvent(o.getAttribute("data-open-event"), o);
    });

    update();
    setupEventDialog();
    // 網址帶有 #活動id 時自動開啟詳情
    var hash = decodeURIComponent(location.hash.replace("#", ""));
    if (hash && EVENTS.some(function (e) { return e.id === hash; })) {
      setTimeout(function () { openEvent(hash); }, 150);
    }
  }

  var lastTrigger = null;
  function setupEventDialog() {
    var dlg = $("#event-dialog");
    if (!dlg) return;
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.closest("[data-close-dialog]")) dlg.close();
    });
    dlg.addEventListener("close", function () {
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
      if (lastTrigger) lastTrigger.focus();
    });
  }

  function openEvent(id, trigger) {
    var dlg = $("#event-dialog");
    var ev = EVENTS.filter(function (e) { return e.id === id; })[0];
    if (!dlg || !ev) return;
    lastTrigger = trigger || null;
    var cat = EVENT_CATEGORIES[ev.category] || { zh: ev.category, en: "" };
    var gallery = (ev.gallery || []).map(function (g) {
      return '<figure><div class="figure-frame aspect-square">' + picture(g.src, g.alt) + "</div>" +
        (g.caption ? '<figcaption class="caption">' + esc(g.caption) + "</figcaption>" : "") + "</figure>";
    }).join("");
    var partners = (ev.partners || []).length ? esc(ev.partners.join("、")) : "待確認";

    $("#event-dialog-body").innerHTML =
      '<div class="grid lg:grid-cols-2">' +
        '<div class="figure-frame aspect-3/2 lg:aspect-auto lg:min-h-full">' + picture(ev.image, ev.imageAlt) + "</div>" +
        '<div class="p-6 sm:p-10">' +
          '<p class="eyebrow">' + esc(cat.en) + "　·　" + esc(STATUS_LABEL[eventStatus(ev)]) + "</p>" +
          '<h2 id="event-dialog-title" class="mt-3 text-2xl sm:text-3xl">' + esc(ev.title) + "</h2>" +
          (ev.titleEn ? '<p class="mt-2 font-display text-lg italic text-muted" lang="en">' + esc(ev.titleEn) + "</p>" : "") +
          '<div class="mt-4">' + todoBadge(ev) + "</div>" +
          '<dl class="mt-6 grid grid-cols-[4.5rem_1fr] gap-y-2 border-y border-line py-5 text-sm">' +
            '<dt class="text-muted">日期</dt><dd>' + esc(eventDateText(ev)) + "</dd>" +
            '<dt class="text-muted">地點</dt><dd>' + esc(ev.location) + "</dd>" +
            '<dt class="text-muted">類別</dt><dd>' + esc(cat.zh) + "</dd>" +
            '<dt class="text-muted">合作單位</dt><dd>' + partners + "</dd>" +
          "</dl>" +
          '<p class="mt-6 leading-loose">' + esc(ev.description) + "</p>" +
          '<div class="mt-6">' + sourceLink(ev) + "</div>" +
        "</div>" +
      "</div>" +
      (gallery ? '<div class="border-t border-line p-6 sm:p-10"><h3 class="text-lg">活動照片</h3><div class="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">' + gallery + "</div></div>" : "");

    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    if (history.replaceState) history.replaceState(null, "", "#" + ev.id);
    var closeBtn = dlg.querySelector("[data-close-dialog]");
    if (closeBtn) closeBtn.focus();
  }

  /* =================================================================
   * 公益行動頁
   * ================================================================= */
  function renderImpact() {
    var el = $("#impact-cases");
    if (el) {
      el.innerHTML = PROJECTS.map(function (p, i) {
        var reverse = i % 2 === 1;
        var related = p.relatedEventId ? '<a class="link-arrow" href="' + esc(url("events.html#" + p.relatedEventId)) + '">相關展覽</a>' : "";
        return '<article id="case-' + esc(p.id) + '" class="reveal grid scroll-mt-28 items-start gap-8 border-t border-line py-14 lg:grid-cols-12 lg:gap-14">' +
          '<div class="lg:col-span-5 ' + (reverse ? "lg:order-2" : "") + '"><figure><div class="figure-frame ' + (i % 2 ? "aspect-square" : "aspect-4/5") + '">' + picture(p.image, p.imageAlt) + "</div>" +
            '<figcaption class="caption">' + esc(p.imageAlt) + "</figcaption></figure></div>" +
          '<div class="lg:col-span-7 ' + (reverse ? "lg:order-1" : "") + '">' +
            '<p class="eyebrow">Case ' + String(i + 1).padStart(2, "0") + "</p>" +
            '<h3 class="mt-3 text-2xl sm:text-3xl">' + esc(p.title) + "</h3>" +
            '<div class="mt-4">' + todoBadge(p) + "</div>" +
            '<dl class="mt-6 grid grid-cols-[5rem_1fr] gap-y-2 border-y border-line py-5 text-sm">' +
              '<dt class="text-muted">時間</dt><dd>' + esc(p.period) + "</dd>" +
              '<dt class="text-muted">合作對象</dt><dd>' + esc((p.partners || []).join("、") || "待確認") + "</dd>" +
              '<dt class="text-muted">場域</dt><dd>' + esc(p.institution) + "</dd>" +
            "</dl>" +
            '<p class="mt-6 leading-loose">' + esc(p.summary) + "</p>" +
            '<div class="mt-6 flex flex-wrap items-center gap-6">' + sourceLink(p) + related + "</div>" +
          "</div></article>";
      }).join("");
    }

    var tl = $("#impact-timeline");
    if (tl) {
      var items = [];
      PROJECTS.forEach(function (p) { items.push({ year: p.year, title: p.institution, href: "#case-" + p.id, verified: p.verified }); });
      EVENTS.filter(function (e) { return e.category === "outreach" || (e.partners || []).some(function (x) { return /衛生福利部/.test(x); }); })
        .forEach(function (e) { items.push({ year: Number(eventYear(e)) || null, title: e.title, href: url("events.html#" + e.id), verified: e.verified }); });
      items.sort(function (a, b) { return (a.year || 9999) - (b.year || 9999); });
      var groups = {};
      items.forEach(function (it) { var k = it.year ? String(it.year) : "年份待確認"; (groups[k] = groups[k] || []).push(it); });
      tl.innerHTML = Object.keys(groups).map(function (k) {
        return '<li class="relative grid gap-3 border-l border-forest/30 pb-10 pl-8 sm:grid-cols-[8rem_1fr] sm:gap-8">' +
          '<span aria-hidden="true" class="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-gold"></span>' +
          '<p class="font-display text-2xl text-forest">' + esc(k) + "</p>" +
          '<ul class="space-y-2">' + groups[k].map(function (it) {
            return '<li><a class="no-underline hover:underline" href="' + esc(it.href) + '">' + esc(it.title) + "</a>" +
              (it.verified === false ? ' <span class="badge-todo ml-2">待確認</span>' : "") + "</li>";
          }).join("") + "</ul></li>";
      }).join("");
    }
  }

  /* =================================================================
   * 最新消息頁
   * ================================================================= */
  function newsRow(n, compact) {
    var date = n.dateText || (parseDate(n.date) ? fmt(parseDate(n.date)) : "");
    var inner = n.link ? '<a class="no-underline hover:underline" href="' + esc(url(n.link)) + '">' + esc(n.title) + "</a>" : esc(n.title);
    return '<article class="reveal grid gap-4 border-t border-line py-8 sm:grid-cols-12 sm:gap-8">' +
      '<div class="sm:col-span-3"><p class="font-latin text-sm tracking-[0.14em] text-forest"><time datetime="' + esc(n.date) + '">' + esc(date) + "</time></p>" +
        '<p class="mt-1 text-xs tracking-[0.16em] text-gold-deep">' + esc(NEWS_CATEGORIES[n.category] || "") + "</p></div>" +
      '<div class="' + (compact ? "sm:col-span-9" : "sm:col-span-6") + '">' +
        '<h3 class="text-lg leading-relaxed sm:text-xl">' + inner + "</h3>" +
        '<p class="mt-3 text-[0.95rem] leading-loose text-ink/90">' + esc(n.summary) + "</p>" +
        '<div class="mt-4 flex flex-wrap items-center gap-4">' + todoBadge(n) + (compact ? "" : sourceLink(n)) + "</div>" +
      "</div>" +
      (compact ? "" : '<div class="sm:col-span-3"><div class="figure-frame aspect-3/2">' + picture(n.image, n.imageAlt) + "</div></div>") +
      "</article>";
  }

  function renderNewsApp() {
    var app = $("#news-app");
    if (!app) return;
    var filterEl = $("#news-filters"), listEl = $("#news-list"), countEl = $("#news-count");
    var current = "all";
    filterEl.innerHTML = ['<button type="button" class="chip" data-news-cat="all" aria-pressed="true">全部</button>']
      .concat(Object.keys(NEWS_CATEGORIES).map(function (k) {
        return '<button type="button" class="chip" data-news-cat="' + k + '" aria-pressed="false">' + esc(NEWS_CATEGORIES[k]) + "</button>";
      })).join("");
    function update() {
      var list = sortByDateDesc(NEWS).filter(function (n) { return current === "all" || n.category === current; });
      listEl.innerHTML = list.length ? list.map(function (n) { return newsRow(n, false); }).join("")
        : '<p class="border-t border-line py-10 text-center text-muted">此分類目前沒有消息。</p>';
      countEl.textContent = "共 " + list.length + " 則";
      setupReveal();
    }
    filterEl.addEventListener("click", function (e) {
      var b = e.target.closest("[data-news-cat]");
      if (!b) return;
      current = b.getAttribute("data-news-cat");
      $all("[data-news-cat]", filterEl).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      update();
    });
    update();
  }

  /* =================================================================
   * 關於我們：團隊
   * ================================================================= */
  function renderTeam() {
    var el = $("#team-list");
    if (!el) return;
    el.innerHTML = TEAM.map(function (m) {
      var photo = m.photo
        ? '<img src="' + esc(url(m.photo)) + '" alt="' + esc(m.photoAlt) + '" loading="lazy" decoding="async" class="h-full w-full object-cover">'
        : '<div class="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-line bg-linen text-center text-xs tracking-wider text-muted"><span>照片待補</span><span class="font-latin text-[0.65rem]">PORTRAIT TBC</span></div>';
      return '<article class="reveal grid gap-6 sm:grid-cols-[11rem_1fr] sm:gap-10">' +
        '<div class="aspect-4/5 w-40 sm:w-full">' + photo + "</div>" +
        "<div>" +
          '<p class="eyebrow">' + esc(m.isFounder ? "Founder" : m.current ? "Board" : "Archive") + "</p>" +
          '<h3 class="mt-2 text-2xl">' + esc(m.name) + "</h3>" +
          '<p class="mt-1 text-sm text-muted">' + esc(m.role) + (m.roleNote ? "｜" + esc(m.roleNote) : "") + "</p>" +
          '<div class="mt-3">' + todoBadge(m, m.current === false ? "歷史資料" : "資料待確認") + "</div>" +
          '<div class="mt-5 space-y-3 leading-loose">' + (m.bio || []).map(function (b) { return "<p>" + esc(b) + "</p>"; }).join("") + "</div>" +
        "</div></article>";
    }).join("");
  }

  /* =================================================================
   * 聯絡頁
   * ================================================================= */
  function renderContactInfo() {
    var el = $("#contact-info");
    if (!el) return;
    var c = CONFIG.contact || {};
    var rows = [];
    if (c.email) rows.push(["Email", '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>"]);
    if (c.phone) rows.push(["電話", '<a href="tel:' + esc(c.phone.replace(/[^0-9+]/g, "")) + '">' + esc(c.phone) + "</a>"]);
    if (c.address) rows.push(["地址", esc(c.address)]);
    if (c.officeHours) rows.push(["時間", esc(c.officeHours)]);
    el.innerHTML = rows.length
      ? '<dl class="grid grid-cols-[4rem_1fr] gap-y-3 text-sm">' + rows.map(function (r) { return '<dt class="text-muted">' + r[0] + "</dt><dd>" + r[1] + "</dd>"; }).join("") + "</dl>"
      : '<p class="text-sm leading-loose text-muted">協會的公開聯絡信箱、電話與地址正在確認中，確認後將公布於此。</p>';

    var d = $("#donation-info");
    if (d) {
      var dn = CONFIG.donation || {};
      d.innerHTML = dn.enabled && dn.bankInfo
        ? '<p class="leading-loose">' + esc(dn.bankInfo) + "</p>" + (dn.receiptNote ? '<p class="mt-3 text-sm text-muted">' + esc(dn.receiptNote) + "</p>" : "")
        : '<p class="leading-loose">' + esc(dn.note || "") + "</p>";
    }
  }

  function setupContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    var status = $("#form-status"), modeNote = $("#form-mode-note"), fallback = $("#form-fallback");
    var email = (CONFIG.contact || {}).email, endpoint = CONFIG.formEndpoint;
    var mode = endpoint ? "endpoint" : email ? "mailto" : "none";

    var notes = {
      endpoint: "送出後，訊息會透過第三方表單服務轉寄給協會。",
      mailto: "本網站沒有後端伺服器。按下「送出」後會開啟您的電子郵件程式並帶入內容，需在郵件程式中按下寄出才算完成。",
      none: "協會聯絡信箱確認中，表單暫時無法直接寄出。按下「整理訊息」後，可複製內容，待信箱公布後再寄送。",
    };
    modeNote.textContent = notes[mode];
    var submitBtn = form.querySelector('button[type="submit"]');
    if (mode === "none") submitBtn.textContent = "整理訊息";

    // 從其他頁面帶入合作類型，例 contact.html?type=workshop
    var params = new URLSearchParams(location.search);
    var t = params.get("type");
    if (t && form.elements.type) {
      var opt = Array.prototype.filter.call(form.elements.type.options, function (o) { return o.value === t; })[0];
      if (opt) form.elements.type.value = t;
    }

    function compose() {
      var f = form.elements;
      var typeLabel = f.type.options[f.type.selectedIndex].text;
      var subject = "【網站洽詢｜" + typeLabel + "】" + f.name.value;
      var bodyText = "姓名：" + f.name.value + "\nEmail：" + f.email.value + "\n組織名稱：" + (f.org.value || "（未填）") +
        "\n合作類型：" + typeLabel + "\n\n訊息內容：\n" + f.message.value + "\n\n— 已閱讀並同意個人資料告知事項";
      return { subject: subject, body: bodyText };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var msg = compose();

      if (mode === "endpoint") {
        submitBtn.disabled = true;
        status.textContent = "傳送中…";
        fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("bad status");
            status.textContent = "已收到您的訊息，協會將以 Email 回覆。";
            form.reset();
          })
          .catch(function () { status.textContent = "傳送失敗，請稍後再試，或改用電子郵件聯絡。"; })
          .then(function () { submitBtn.disabled = false; });
        return;
      }
      if (mode === "mailto") {
        window.location.href = "mailto:" + encodeURIComponent(email) + "?subject=" + encodeURIComponent(msg.subject) + "&body=" + encodeURIComponent(msg.body);
        status.textContent = "已嘗試開啟您的郵件程式。若沒有反應，請直接寄信至 " + email + "。";
        return;
      }
      // 尚未設定信箱：顯示可複製的內容
      fallback.hidden = false;
      var ta = $("#form-fallback-text");
      ta.value = msg.subject + "\n\n" + msg.body;
      ta.focus();
      status.textContent = "訊息已整理完成，可在下方複製。";
    });

    var copyBtn = $("#copy-message");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      var ta = $("#form-fallback-text");
      ta.select();
      var done = function () { copyBtn.textContent = "已複製"; setTimeout(function () { copyBtn.textContent = "複製內容"; }, 2000); };
      if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(done, function () { document.execCommand("copy"); done(); });
      else { document.execCommand("copy"); done(); }
    });
  }

  /* ---------- 啟動 ---------- */
  function init() {
    renderHeader();
    renderFooter();
    bindConfig();
    renderFeaturedEvents();
    renderHomeNews();
    renderHomeImpact();
    renderMap($("#home-map"), { dark: true, linkBase: url("global.html") });
    renderMap($("#global-map"), { dark: false });
    renderHomeRegions();
    renderExchangeRegions();
    renderEventsApp();
    renderImpact();
    renderNewsApp();
    renderTeam();
    renderContactInfo();
    setupContactForm();
    setupReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
