const staticCacheName = "site-static";
const assetes = [
  "/",
  "/index.html",
  "/script.js",
  "/podcast.html",
  "/podcastScript.js",
  "/search.html",
  "/searchScript.js",
  "/subscribed.html",
  "/subscribedScript.js",
  "/downloads.html",
  "/downloadsScript.js",
  "/styles.css",
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
  console.log("service worker has been activated");
});

//Fetch event
self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(cachesRes => {
      return cachesRes || fetch(evt.request);
    })
  );
});
