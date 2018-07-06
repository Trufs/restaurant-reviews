//Restaurants Service Worker
// 'use strict';
var staticCacheName = 'restaurants-static-v28';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/restaurant.html?id=1',
       '/restaurant.html?id=2',
       '/restaurant.html?id=3',
       '/restaurant.html?id=4',
       '/restaurant.html?id=5',
       '/restaurant.html?id=6',
       '/restaurant.html?id=7',
       '/restaurant.html?id=8',
       '/restaurant.html?id=9',
       '/restaurant.html?id=10',
       'css/styles.css',
       'css/details.css',
       'js/main.js',
       'js/restaurant_info.js',
       'js/dbhelper.js',
       'img/1.jpg',
       'img/2.jpg',
       'img/3.jpg',
       'img/4.jpg',
       'img/5.jpg',
       'img/6.jpg',
       'img/7.jpg',
       'img/8.jpg',
       'img/9.jpg',
       'img/10.jpg',
       'data/restaurants.json'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurants-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function(response) {
       return response || fetch(event.request);
    })
  );
});
