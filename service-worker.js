
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('aijoe-store').then(cache => {
      return cache.addAll(['index.html', 'manifest.json', 'joey-avatar.png']);
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
