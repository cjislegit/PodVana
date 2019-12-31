const staticCacheName = "site-static-test";
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
  "/styles/styles.css",
  "/img/PF-liveops_InvariantCulture_Default.jpg",
  "https://fonts.googleapis.com/css?family=Lato:100,900&display=swap",
  "/pages/fallback.html",
  "/js/fb.js",
  "js/db.js",
  "js/searchAndContinuity.js",
  "js/ui.js",
  "./keys.js",
  "./manifest.json"
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
