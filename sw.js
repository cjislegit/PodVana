//Install service worker
self.addEventListener('install', evt => {
  console.log('service worker has been installed');
});

//Listening for activating of service worker
self.addEventListener('activate', evt => {
  console.log('service worker has been activated');
});
