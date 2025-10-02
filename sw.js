const CACHE_NAME = 'camisetas-aj-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar solicitudes de red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devolver recurso desde cache si existe
                if (response) {
                    return response;
                }
                
                // Si no está en cache, hacer petición de red
                return fetch(event.request).then(response => {
                    // Verificar si la respuesta es válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clonar la respuesta
                    const responseToCache = response.clone();
                    
                    // Añadir al cache
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
            .catch(() => {
                // Si falla la red, mostrar página offline personalizada
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Actualizar Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Manejar notificaciones push (opcional)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nueva oferta disponible en Camisetas AJ',
        icon: '/logo-192.png',
        badge: '/logo-192.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver ofertas',
                icon: '/logo-192.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/logo-192.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Camisetas AJ', options)
    );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/#productos')
        );
    } else if (event.action === 'close') {
        event.notification.close();
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});