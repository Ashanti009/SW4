// ====== service-worker.js ======
const CACHE_NAME = 'wakfu-cache-v1';
const urlsToCache = [
  'index.html',
  'pagina1.html',
  'pagina2.html',
  'pagina3.html',
  'styles.css',
  'main.js',
  'logo.png',
  'wakfu_intro.jpg',
  'personajes.jpg',
  'razas.jpg',
  'historia.jpg'
];

// INSTALACIÓN
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVACIÓN
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// FETCH (network-first)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
