// ============================================================
//  lib/v3/admin-menu.js
//  Munculin item "Admin Panel" di menu hamburger HANYA untuk admin.
//  Item-nya sudah ada di markup tiap halaman (tersembunyi); script ini
//  cuma membukanya kalau SERVER mengonfirmasi akun ini admin
//  (token Firebase diverifikasi di backend).
//  Kalau akun admin ditolak server, muncul banner diagnosa di layar
//  (hanya untuk email admin itu sendiri).
// ============================================================
import { auth, onAuth } from "./auth.js";

const ADMIN_HINT_EMAIL = "admin@axzye.biz.id";
const ATTR = "data-admin-menu";

function items() { return document.querySelectorAll(`[${ATTR}]`); }

function inject() {  // cadangan kalau halaman belum punya item statis
  const dd = document.getElementById("dropdown");
  if (!dd) return;
  const a = document.createElement("a");
  a.href = "/adminpanel.html";
  a.setAttribute("role", "menuitem");
  a.setAttribute(ATTR, "1");
  a.style.display = "none";
  a.innerHTML =
    '<div class="ic"><svg class="icon-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><polyline points="9 12 11 14 15 10"/></svg></div>' +
    '<div class="txt"><b>Admin Panel</b><small>Kelola tools &amp; ZIP source</small></div>';
  const divider = dd.querySelector(".divider");
  dd.insertBefore(a, divider || null);
}

function show(on) {
  if (!items().length) inject();
  items().forEach(n => { n.style.display = on ? "" : "none"; });
}

function banner(text) {
  let b = document.getElementById("adminDiag");
  if (!b) {
    b = document.createElement("div");
    b.id = "adminDiag";
    b.style.cssText = "position:fixed;left:12px;right:12px;bottom:76px;z-index:9999;padding:12px 14px;" +
      "background:#111;color:#fff;border:2px solid #ff3b30;font:12px/1.5 ui-monospace,Menlo,monospace;cursor:pointer";
    b.addEventListener("click", () => b.remove());
    document.body.appendChild(b);
  }
  b.textContent = text;
  setTimeout(() => b.remove(), 20000);
}

const REASONS = {
  email_belum_verified: "Email admin belum diverifikasi di Firebase (ADMIN_REQUIRE_VERIFIED=1 aktif).",
  email_bukan_admin: "Email ini tidak ada di ADMIN_EMAILS server."
};

function diagnose(user, status, data) {
  if ((user.email || "").toLowerCase() !== ADMIN_HINT_EMAIL) return;   // user lain tidak diberi info apa pun
  let why;
  if (status === 0) why = "Gagal terhubung ke server.";
  else if (status === 404) why = "Endpoint admin-check tidak ada → deploy belum memakai versi terbaru.";
  else if (status === 401) why = "Server menolak token login. Cek paket 'jose' terpasang & FIREBASE_PROJECT_ID (harus axzyedev).";
  else if (status === 429) why = "Terlalu banyak request, coba lagi sebentar.";
  else if (status >= 500) why = "Server error (cek Vercel → Logs).";
  else why = REASONS[data && data.reason] || "Server menjawab bukan admin.";
  console.warn("[admin-menu] admin-check:", status, data);
  banner("Admin Panel disembunyikan: " + why);
}

onAuth(async (user) => {
  show(false);
  if (!user) return;
  try {
    const token = await user.getIdToken();
    const res = await fetch("/api/web/admin-check", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: "{}"
    });
    let data = {};
    try { data = await res.json(); } catch { /* bukan JSON */ }
    if (res.ok && data.isAdmin === true && auth.currentUser && auth.currentUser.uid === user.uid) { show(true); return; }
    diagnose(user, res.status, data);
  } catch (e) {
    diagnose(user, 0, { message: String(e && e.message) });
  }
});
