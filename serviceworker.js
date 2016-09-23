if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceworker.js')
    .then(() => {
      console.log('[Service Worker] Registered');
    });
}

const dataCacheName = 'todoData-v2';
const cacheName = 'todoApp-v2';
const filesToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/styles.css',
  '/css/materialize.css',
  '/js/materialize.js',
  '/images/logo.png'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing');
  e.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      console.log('[Service Worker] Caching App Shell');
      return cache.addAll(filesToCache);
    })
  );
});

// mediator for requests
self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] Fetch', e.request.url);
  const dataUrl = 'https://pwa-todo.firebaseio.com';
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response) {
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request)
      .then((resp) => {
        return resp || fetch(e.request);
      })
    );
  }
});

// removes older caches
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
