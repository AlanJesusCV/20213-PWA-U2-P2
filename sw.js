const CACHE_STATIC = "static_v1"
const CACHE_INMUTABLE = "inmutable_v1"

self.addEventListener('install', event => {

    console.log('SW Instalado');

    const cacheStatic = caches.open(CACHE_STATIC)
    .then( cache => {
        cache.addAll([
            './',
            './index.html',
            './manifest.json',
            './js/camara.js',
            './js/app.js',
            './images/icons/android-launchericon-48-48.png',
            './images/icons/android-launchericon-72-72.png',
            './images/icons/android-launchericon-96-96.png',
            './images/icons/android-launchericon-144-144.png',
            './images/icons/android-launchericon-192-192.png',
            './images/icons/android-launchericon-512-512.png',
        ])
    })
 
    const cacheInmutable = caches.open(CACHE_INMUTABLE)
    .then( cache => {
         cache.addAll([
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
            'https://code.jquery.com/jquery-3.6.0.slim.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
        ])
    })

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]))
});

self.addEventListener('fetch',(event)=>{
    event.respondWith(caches.match(event.request));
})
