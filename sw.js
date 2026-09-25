// Service worker Kalkulator Tunggak Semi
// Strategi: network-first untuk semua file inti, cache hanya dipakai
// sebagai cadangan saat offline. Ini membuat halaman otomatis memakai
// versi kode terbaru setiap kali online, tanpa perlu menaikkan versi
// cache secara manual.

const CACHE_NAME = 'tunggaksemi-calc-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/icon-180.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Cache setiap aset secara terpisah: kalau satu file gagal (mis. path
      // salah atau jaringan lambat), instalasi service worker tetap lanjut
      // untuk aset lainnya, bukannya gagal total.
      Promise.all(
        CORE_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn('Gagal cache:', url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const copy = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return networkResponse;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
