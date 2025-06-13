const CACHE_NAME = "30-day-challenge-v2";
const OFFLINE_URL = "/offline.html";

// Files to cache for offline functionality
const PRECACHE_URLS = [
  "/",
  "/offline.html",
  "/pwa-icons/android/android-launchericon-192-192.png",
  "/pwa-icons/android/android-launchericon-96-96.png",
  "/manifest.json",
];

// Install event - cache essential resources
self.addEventListener("install", function (event) {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log("Caching app shell and offline page");
        return cache.addAll(PRECACHE_URLS);
      })
      .then(function () {
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", function (event) {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(function () {
        return self.clients.claim();
      }),
  );
});

// Fetch event - implement Network First strategy with offline fallback
self.addEventListener("fetch", function (event) {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip requests to external domains
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API requests (let them fail naturally)
  if (event.request.url.includes("/api/")) {
    return;
  }

  // Handle navigation requests (page loads) with Network First + Offline fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          // If network succeeds, cache the response and return it
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          }
          return response;
        })
        .catch(function () {
          // Network failed - serve offline page
          console.log("Network failed for navigation, serving offline page");
          return caches.match(OFFLINE_URL).then(function (offlineResponse) {
            return (
              offlineResponse ||
              new Response("Offline page not found", { status: 404 })
            );
          });
        }),
    );
    return;
  }

  // Handle non-navigation requests (assets, etc.) with Cache First strategy
  event.respondWith(
    caches
      .match(event.request)
      .then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then(function (response) {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(function () {
        // For non-navigation requests, just fail if not in cache
        return new Response("Resource not available offline", { status: 503 });
      }),
  );
});

// Push notification event
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/pwa-icons/android/android-launchericon-192-192.png",
      badge: "/pwa-icons/android/android-launchericon-96-96.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click event
self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");
  event.notification.close();
  event.waitUntil(clients.openWindow(self.location.origin));
});
