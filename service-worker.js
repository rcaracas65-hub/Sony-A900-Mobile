const CACHE_NAME = 'sony-a900-a99v-v1';
const ASSETS = [
  'index.html',
  'Sony%20A900.PDF',
  'SonyA99V.pdf',
  'SonySLTA99V.html',
  'menu_grabacion_1.html',
  'menu_grabacion_2.html',
  'menu_grabacion_3.html',
  'menu_grabacion_4.html',
  'menu_personalizado_1.html',
  'menu_personalizado_2.html',
  'menu_personalizado_3.html',
  'menu_reproduccion_1.html',
  'menu_reproduccion_2.html',
  'menu_configuracion_1.html',
  'menu_configuracion_2.html',
  'menu_configuracion_3.html',
  'menu_configuracion_4.html'
  // agrega más archivos aquí si los necesitas
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});