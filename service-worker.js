const CACHE_NAME = "football-v9";
var urlToCache = [
    "/",
    "/manifest.json",
    "/index.html",
    "/nav.html",
    "/detailMatch.html",
    "/favicon.ico",
    "/pages/match.html",
    "/pages/saved.html",
    "/css/materialize.css",
    "/css/materialize.min.css",
    "/js/api.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/script.js",
    "/img/icon.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.match(event.request).then(function(response){
                return response || fetch(event.request).then(function(response){
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        })
    )
});

self.addEventListener('activate', function (event) {
    console.log("Activate new service worker");
    event.waitUntil(
        caches.keys().then(function(cacheName){
            return Promise.all(
                cacheName.map(function(cacheName){
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    ) ;
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100, 50, 100],
        data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});