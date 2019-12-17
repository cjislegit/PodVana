const staticCacheName = "site-static-beta-V1";
const assetes = [
  "/",
  "/index.html",
  "/js/script.js",
  "/pages/podcast.html",
  "/js/podcastScript.js",
  "/pages/search.html",
  "/js/searchScript.js",
  "/pages/subscribed.html",
  "/js/subscribedScript.js",
  "/pages/downloads.html",
  "/js/downloadsScript.js",
  "/styles/styles.css",
  "https://fonts.googleapis.com/css?family=Lato:100,900&display=swap"
];

//Install service worker
self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assetes);
    })
  );
});

//Listening for activating of service worker
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

//Fetch event
// self.addEventListener("fetch", evt => {
//   //Checks if requested file is in cache and returns it if it is
//   evt.respondWith(
//     caches.match(evt.request).then(cachesRes => {
//       return cachesRes || fetch(evt.request);
//     })
//   );
// });
