
self.addEventListener('install',e=>{e.waitUntil(caches.open('aijoe').then(c=>c.addAll(['index.html','manifest.json','joey-avatar.png'])))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
