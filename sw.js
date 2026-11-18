/* Service Worker: hält nur die App-Hülle offline bereit.
   API-Antworten und Bilder der Archive werden bewusst NICHT gecacht. */
const VERSION = "og-v5";
const SHELL = [
  "./", "index.html", "manifest.webmanifest",
  "assets/fonts/fraunces-600.woff2", "assets/fonts/inter-400.woff", "assets/fonts/inter-600.woff",
  "assets/fonts/pagella-400.woff", "assets/fonts/pagella-400i.woff",
  "assets/icons/icon-192.png", "assets/icons/icon-512.png", "assets/icons/apple-touch-icon.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  if (e.request.mode === "navigate") {
    // Seite: erst Netz (immer aktuell), offline aus dem Cache
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put("index.html", c)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Schriften, Icons: Cache zuerst
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
