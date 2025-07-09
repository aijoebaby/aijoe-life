
const cacheName = 'aijoe-cache-v1';
const assetsToCache = ['/', '/index.html', '/style.css', '/script.js', '/joey-avatar.png', '/manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(cacheName).then(c => c.addAll(assetsToCache))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
