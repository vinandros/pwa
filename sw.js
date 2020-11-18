const cacheName = "apv-v5";

const files = [
  "/",
  "/index.html",
  "/error.html",
  "/css/bootstrap.css",
  "/css/styles.css",
  "/js/app.js",
  "/js/apv.js",
];

self.addEventListener("install", (e) => {
  console.log("SW instalado!");

  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("cacheando");
      cache.addAll(files);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("SW activado");
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Fetch... ", e);

  e.respondWith(
    caches
      .match(e.request)
      .then((cacheRes) => {
        return cacheRes;
      })
      .catch(() => caches.match("/error.html"))
  );
});
