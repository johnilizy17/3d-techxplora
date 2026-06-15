// Service Worker for TechXplora - Enhanced Offline Support
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `techxplora-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `techxplora-dynamic-${CACHE_VERSION}`;
const API_CACHE = `techxplora-api-${CACHE_VERSION}`;

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Failed to cache some assets:', err);
        // Don't fail installation if some assets fail
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name.startsWith('techxplora-') && 
                   name !== STATIC_CACHE && 
                   name !== DYNAMIC_CACHE && 
                   name !== API_CACHE;
          })
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions, other protocols, and HMR/WS requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip Vite HMR and WebSocket connections
  if (url.pathname.includes('/@vite') || 
      url.pathname.includes('/@fs') ||
      url.pathname.includes('/__vite') ||
      url.pathname.includes('/node_modules/') ||
      url.protocol === 'ws:' || 
      url.protocol === 'wss:') {
    return;
  }

  // Skip localhost/development requests during dev
  if (url.hostname === 'localhost' && url.port === '5173') {
    return;
  }

  // API requests - Network First, fallback to cache
  if (url.hostname.includes('api.') || url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request, API_CACHE));
    return;
  }

  // Static assets (JS, CSS, images, fonts) - Cache First
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/)
  ) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    return;
  }

  // HTML pages - Stale While Revalidate (show cached, update in background)
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
    return;
  }

  // Default - Network First
  event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
});

// Cache First Strategy - for static assets
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Return cached version immediately
      // Update cache in background
      fetch(request).then(networkResponse => {
        if (networkResponse && networkResponse.ok) {
          caches.open(cacheName).then(cache => {
            cache.put(request, networkResponse);
          });
        }
      }).catch(() => {
        // Ignore network errors in background update
      });
      
      return cachedResponse;
    }

    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache First failed for:', request.url);
    
    // Try to return cached version as last resort
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Network First Strategy - for dynamic content and API
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request, {
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
    });
    
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url);
    
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    throw error;
  }
}

// Stale While Revalidate - show cached immediately, update in background
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse && networkResponse.ok) {
      // Clone the response before using it
      const responseToCache = networkResponse.clone();
      caches.open(cacheName).then(cache => {
        cache.put(request, responseToCache);
      });
    }
    return networkResponse;
  }).catch(error => {
    console.log('[SW] Network failed for:', request.url);
    // If we have cached version, return it
    if (cachedResponse) {
      return cachedResponse.clone();
    }
    // Otherwise return offline page
    return caches.match('/offline.html');
  });
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse ? cachedResponse.clone() : fetchPromise;
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('[SW] Syncing data...');
  // Implement your sync logic here
  // This could retry failed API requests stored in IndexedDB
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'TechXplora';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});

// Message handler for manual cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
