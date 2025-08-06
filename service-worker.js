importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const CACHE_NAME = 'finovix-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/main.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Add dynamic caching
workbox.routing.registerRoute(
    new RegExp('/api/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            })
        ]
    })
);

// Add offline fallback
workbox.routing.registerRoute(
    new RegExp('/.*'),
    new workbox.strategies.NetworkOnly({
        plugins: [
            new workbox.backgroundSync.BackgroundSyncPlugin('offlineQueue', {
                maxRetentionTime: 24 * 60 // 24 Hours
            })
        ]
    }),
    'POST'
);
