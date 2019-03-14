importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js');
const CACHE_NAME = "football-v9";
var base_url = "https://api.football-data.org/";

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/detailMatch.html', revision: '1' },
    { url: '/favicon.ico', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/img/icon.png', revision: '1' }
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp(base_url + "v2/competitions/CL/matches"),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp(base_url + "v2/matches/"),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp("https://fonts.googleapis.com/icon?family=Material+Icons"),
    workbox.strategies.staleWhileRevalidate()
);

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