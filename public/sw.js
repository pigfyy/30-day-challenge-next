const CACHE_NAME = "30-day-challenge-v3";
const OFFLINE_URL = "/offline.html";

// Essential resources to precache
const urlsToCache = [
  "/",
  "/offline.html",
  "/pwa-icons/android/android-launchericon-192-192.png",
  "/pwa-icons/android/android-launchericon-96-96.png",
];

// Install event - cache offline page and essential resources
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[ServiceWorker] Caching offline page");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log("[ServiceWorker] Skip waiting on install");
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[ServiceWorker] Removing old cache", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        console.log("[ServiceWorker] Claiming clients");
        return self.clients.claim();
      }),
  );
});

// Fetch event - handle offline requests
self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch", event.request.url);

  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Only handle requests from same origin
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Don't handle API requests
  if (event.request.url.includes("/api/")) return;

  // Handle page navigation requests
  if (event.request.mode === "navigate") {
    console.log(
      "[ServiceWorker] Handling navigate request for",
      event.request.url,
    );

    event.respondWith(
      fetch(event.request)
        .then((response) => {
          console.log(
            "[ServiceWorker] Network response for navigation",
            response.status,
          );
          // Network request succeeded, cache and return the response
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch((error) => {
          console.log(
            "[ServiceWorker] Network request failed, serving offline page",
            error,
          );
          // Network request failed, serve offline page
          return caches.open(CACHE_NAME).then((cache) => {
            return cache.match(OFFLINE_URL);
          });
        }),
    );
  }
  // Handle other requests (assets, etc.)
  else {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            console.log(
              "[ServiceWorker] Serving from cache",
              event.request.url,
            );
            return response;
          }

          console.log(
            "[ServiceWorker] Fetching from network",
            event.request.url,
          );
          return fetch(event.request).then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          });
        })
        .catch((error) => {
          console.log(
            "[ServiceWorker] Failed to fetch resource",
            event.request.url,
            error,
          );
          return new Response("Resource not available offline", {
            status: 503,
            statusText: "Service Unavailable",
          });
        }),
    );
  }
});

// Push notification handling
self.addEventListener("push", (event) => {
  console.log("[ServiceWorker] Push Received.");

  if (event.data) {
    const data = event.data.json();
    const title = data.title || "30 Day Challenge";
    const options = {
      body: data.body,
      icon: data.icon || "/pwa-icons/android/android-launchericon-192-192.png",
      badge: "/pwa-icons/android/android-launchericon-96-96.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "1",
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  }
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  console.log("[ServiceWorker] Notification click Received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("/"));
});
