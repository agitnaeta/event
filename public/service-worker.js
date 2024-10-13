const cacheName = 'todo-cache';


// Install event
self.addEventListener('install', (event) => {
    console.log("Installed")
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log("Activated")
    event.waitUntil(
        clients.claim()
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            // Fallback to cache entry for '/notification' when both network and cache fail
            return caches.match('/notification');
        })
    );
});
