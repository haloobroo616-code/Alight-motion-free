/* ============================================================
   AxzyeDev — Board Message Widget
   /board-message.js

   Banner broadcast dari admin, muncul di ATAS halaman manapun
   yang include script ini, tampil bentar terus ilang sendiri.

   CARA PAKAI — taro sebelum </body> di tiap halaman:
     <script src="/board-message.js" defer></script>

   Kontennya diatur admin lewat curl (Termux), lihat komentar di
   api/v1/board-message.js buat contoh command-nya. Gak ada cara
   kirim broadcast dari web sama sekali — cuma lewat command line.
   ============================================================ */
(function () {
  "use strict";

  var API_URL = "/api/v1/board-message-api";
  var AUTO_HIDE_MS = 7000;          // durasi tampil sebelum ilang otomatis
  var SEEN_KEY = "axzye_board_seen"; // sessionStorage: biar gak nongol berkali-kali
                                      // di halaman yang sama, tapi tetap muncul lagi
                                      // kalau admin kirim pesan BARU (id beda) atau
                                      // kalau tab/browser-nya baru (session baru).

  /* ---------- Apple-style emoji ----------
     Ganti karakter emoji unicode jadi <img> apple-style biar
     tampilannya sama kayak di iPhone, di semua device/browser. */
  function emojiToAppleImg(text) {
    try {
      return String(text).replace(
        /\p{Extended_Pictographic}(\u200D\p{Extended_Pictographic})*/gu,
        function (m) {
          var codepoints = Array.from(m)
            .map(function (c) { return c.codePointAt(0).toString(16); })
            .join("-");
          var src = "https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/" + codepoints + ".png";
          return (
            '<img src="' + src + '" alt="' + m + '" draggable="false" ' +
            'class="axzye-bm-emoji" onerror="this.replaceWith(document.createTextNode(this.alt));">'
          );
        }
      );
    } catch (e) {
      // Browser lama yang gak support \p{Extended_Pictographic} regex → fallback teks polos
      return String(text);
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---------- CSS (di-inject sekali, match tema AxzyeDev) ---------- */
  function injectStyle() {
    if (document.getElementById("axzye-bm-style")) return;
    var css = ''
      + '.axzye-bm-bar{position:fixed;top:0;left:0;right:0;z-index:99999;'
      + 'display:flex;align-items:center;gap:12px;padding:11px 18px;'
      + 'background:linear-gradient(180deg, rgba(15,10,26,0.96), rgba(8,6,16,0.94));'
      + 'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'
      + 'border-bottom:1px solid rgba(167,139,250,0.35);'
      + 'box-shadow:0 8px 32px -8px rgba(167,139,250,0.35), 0 1px 0 rgba(255,255,255,0.06) inset;'
      + 'font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'SF Pro Display\',\'Segoe UI\',sans-serif;'
      + 'color:#f5f5f7;transform:translateY(-110%);transition:transform .45s cubic-bezier(.16,1,.3,1);'
      + 'flex-wrap:wrap;row-gap:6px;}'
      + '.axzye-bm-bar.axzye-bm-show{transform:translateY(0);}'
      + '.axzye-bm-admin{display:flex;align-items:center;gap:5px;flex-shrink:0;'
      + 'font-weight:700;font-size:13px;letter-spacing:-0.01em;color:#a78bfa;}'
      + '.axzye-bm-badge{width:14px;height:14px;flex-shrink:0;}'
      + '.axzye-bm-sep{width:3px;height:3px;border-radius:50%;background:rgba(245,245,247,0.35);flex-shrink:0;}'
      + '.axzye-bm-text{font-size:13px;font-weight:500;color:rgba(245,245,247,0.92);'
      + 'line-height:1.4;flex:1;min-width:0;}'
      + '.axzye-bm-emoji{width:16px;height:16px;vertical-align:-3px;margin:0 1px;}'
      + '.axzye-bm-icon-emoji{width:18px;height:18px;vertical-align:-4px;margin-right:2px;}'
      + '.axzye-bm-close{flex-shrink:0;width:22px;height:22px;border-radius:7px;border:none;'
      + 'background:rgba(255,255,255,0.08);color:rgba(245,245,247,0.7);cursor:pointer;'
      + 'display:flex;align-items:center;justify-content:center;transition:background .15s;'
      + 'margin-left:auto;padding:0;}'
      + '.axzye-bm-close:hover{background:rgba(255,255,255,0.16);color:#fff;}'
      + '.axzye-bm-close svg{width:12px;height:12px;}'
      + '@media (max-width:560px){'
      + '.axzye-bm-bar{padding:10px 12px;gap:8px;}'
      + '.axzye-bm-admin{font-size:12px;}'
      + '.axzye-bm-text{font-size:12px;width:100%;order:3;}'
      + '}';
    var style = document.createElement("style");
    style.id = "axzye-bm-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- Badge centang merah (verified) ---------- */
  var REDCHECK_SVG =
    '<svg class="axzye-bm-badge" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M11 0l2.36 1.36 2.7-.4 1.36 2.36 2.36 1.36-.4 2.7L20.76 9.5l-1.4 2.32.4 2.7-2.36 1.36-1.36 2.36-2.7-.4L11 19.5l-2.36-1.36-2.7.4-1.36-2.36-2.36-1.36.4-2.7L1.24 9.5l1.4-2.32-.4-2.7L4.6 3.12 5.96.76l2.7.4L11 0z" fill="#ff3b30"/>' +
    '<path d="M7 11.2l2.4 2.4L15 8" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '</svg>';

  /* ---------- Render banner ---------- */
  function showBanner(data) {
    injectStyle();

    var bar = document.createElement("div");
    bar.className = "axzye-bm-bar";
    bar.setAttribute("role", "status");

    var emojiHtml = data.emoji
      ? '<span class="axzye-bm-icon-emoji-wrap">' + emojiToAppleImg(escapeHtml(data.emoji)).replace('class="axzye-bm-emoji"', 'class="axzye-bm-icon-emoji"') + '</span>'
      : "";

    var adminHtml =
      '<span class="axzye-bm-admin">' +
        emojiHtml +
        escapeHtml(data.admin || "Axzye") +
        (data.verified ? REDCHECK_SVG : "") +
      '</span>';

    var textHtml = '<span class="axzye-bm-text">' + emojiToAppleImg(escapeHtml(data.message || "")) + '</span>';

    var closeHtml =
      '<button type="button" class="axzye-bm-close" aria-label="Tutup">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
          '<line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/>' +
        '</svg>' +
      '</button>';

    bar.innerHTML =
      '<span class="axzye-bm-sep" style="display:none"></span>' +
      adminHtml +
      '<span class="axzye-bm-sep"></span>' +
      textHtml +
      closeHtml;

    document.body.appendChild(bar);

    // trigger transisi slide-down
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bar.classList.add("axzye-bm-show");
      });
    });

    var hideTimer = null;
    var startedAt = Date.now();
    var remaining = AUTO_HIDE_MS;

    function hide() {
      bar.classList.remove("axzye-bm-show");
      setTimeout(function () {
        if (bar.parentNode) bar.parentNode.removeChild(bar);
      }, 500);
    }

    function startTimer(ms) {
      hideTimer = setTimeout(hide, ms);
      startedAt = Date.now();
      remaining = ms;
    }

    startTimer(AUTO_HIDE_MS);

    // Pause auto-hide pas di-hover, lanjut lagi pas mouse keluar
    bar.addEventListener("mouseenter", function () {
      clearTimeout(hideTimer);
      remaining = remaining - (Date.now() - startedAt);
      if (remaining < 800) remaining = 800;
    });
    bar.addEventListener("mouseleave", function () {
      startTimer(remaining);
    });

    bar.querySelector(".axzye-bm-close").addEventListener("click", function () {
      clearTimeout(hideTimer);
      hide();
    });
  }

  /* ---------- Init ---------- */
  function init() {
    fetch(API_URL, { method: "GET" })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.active || !res.message) return;

        var seenId = "";
        try { seenId = sessionStorage.getItem(SEEN_KEY) || ""; } catch (e) {}

        if (seenId === String(res.id)) return; // udah pernah muncul di sesi ini

        try { sessionStorage.setItem(SEEN_KEY, String(res.id)); } catch (e) {}

        showBanner(res);
      })
      .catch(function () { /* diem aja kalau gagal fetch, jangan ganggu halaman */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
