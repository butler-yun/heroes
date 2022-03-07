self.addEventListener("install", (event) => {
    console.log("[ServiceWorker] Install");

    event.waitUntil(
        (async () => {
            const cache = await caches.open("heroes");
            await cache.add(new Request("index.html", { cache: "reload" }));
        })()
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("[ServiceWorker] Activate");
    event.waitUntil(
        (async () => {
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    console.log("[Service Worker] Fetch failed; returning offline page instead.", error);

                    const cache = await caches.open("heroes");
                    const cachedResponse = await cache.match("index.html");
                    return cachedResponse;
                }
            })()
        );
    }
});
