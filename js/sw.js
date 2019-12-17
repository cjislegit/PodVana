const staticCacheName = "site-static";
const assetes = [
  "/",
  "/index.html",
  "/js/script.js",
  "/podcast.html",
  "/js/podcastScript.js",
  "/search.html",
  "/js/searchScript.js",
  "/subscribed.html",
  "/js/subscribedScript.js",
  "/downloads.html",
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

// Fetch event
self.addEventListener("fetch", evt => {
  //Checks if requested file is in cache and returns it if it is
  evt.respondWith(
    caches.match(evt.request).then(cachesRes => {
      return cachesRes || fetch(evt.request);
    })
  );
});
