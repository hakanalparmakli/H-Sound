// H-Sound Service Worker - Arka plan desteği
const CACHE_NAME = 'h-sound-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/music-player.html',
    '/manifest.json',
    '/icon.png'
];

// Service Worker kurulumu
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker yükleniyor...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cache açıldı');
                return cache.addAll(urlsToCache);
            })
    );
});

// Service Worker aktivasyonu
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker aktif');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eski cache siliniyor:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Network isteklerini yakala
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache'de varsa döndür, yoksa network'ten çek
                if (response) {
                    return response;
                }
                return fetch(event.request).then((response) => {
                    // Geçerli response değilse cache'leme
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Response'u klonla ve cache'e ekle
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});

// Arka plan senkronizasyonu
self.addEventListener('sync', (event) => {
    console.log('🔄 Background sync:', event.tag);
    if (event.tag === 'sync-playlists') {
        event.waitUntil(syncPlaylists());
    }
});

async function syncPlaylists() {
    // Çalma listelerini senkronize et
    console.log('📋 Çalma listeleri senkronize ediliyor...');
}

// Push notification
self.addEventListener('push', (event) => {
    console.log('🔔 Push notification alındı');
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'H-Sound';
    const options = {
        body: data.body || 'Yeni müzik eklendi!',
        icon: '/icon.png',
        badge: '/icon.png',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification tıklama
self.addEventListener('notificationclick', (event) => {
    console.log('🖱️ Notification tıklandı');
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

// Message handling - Müzik kontrolü
self.addEventListener('message', (event) => {
    console.log('💬 Message alındı:', event.data);
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('🎵 H-Sound Service Worker hazır!');
