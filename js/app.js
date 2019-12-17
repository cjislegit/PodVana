//If web browers supports sw one will be registered
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/js/sw.js")
    .then(reg => console.log("Service worker registered", reg))
    .catch(err => console.log("Service worker not refistered", err));
}
