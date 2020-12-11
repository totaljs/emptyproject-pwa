var CACHE_NAME = '000001';

var cachefiles = [
	'https://cdn.componentator.com/spa.min@18.js',
	'https://cdn.componentator.com/spa.min@18.css',
	'https://cdn.componentator.com/webfonts/fa-brands-400.eot',
	'https://cdn.componentator.com/webfonts/fa-brands-400.woff2',
	'https://cdn.componentator.com/webfonts/fa-brands-400.woff',
	'https://cdn.componentator.com/webfonts/fa-brands-400.ttf',
	'https://cdn.componentator.com/webfonts/fa-regular-400.eot',
	'https://cdn.componentator.com/webfonts/fa-regular-400.woff2',
	'https://cdn.componentator.com/webfonts/fa-regular-400.woff',
	'https://cdn.componentator.com/webfonts/fa-regular-400.ttf',
	'https://cdn.componentator.com/webfonts/fa-solid-900.eot',
	'https://cdn.componentator.com/webfonts/fa-solid-900.woff2',
	'https://cdn.componentator.com/webfonts/fa-solid-900.woff',
	'https://cdn.componentator.com/webfonts/fa-solid-900.ttf',
	'/css/default.css',
	'/js/default.js',
	'/'
];

self.addEventListener('install', function(e) {
	// Perform install steps
	e.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
		return cache.addAll(cachefiles);
	}));
});

// self.addEventListener('activate', function() {
//
// });

self.addEventListener('fetch', function(e) {
	e.respondWith(caches.match(e.request).then(function(response) {
		// Cache hit - return response
		return response ? response : fetch(e.request);
	}));
});

self.addEventListener('sync', function(e) {
	switch (e.tag) {
		case 'test-tag-from-devtools':
			break;
	}
});

self.addEventListener('push', function(event) {
	var title = 'Yay a message.';
	var body = 'We have received a push message.';
	var icon = '/images/smiley.svg';
	var tag = 'simple-push-example-tag';
	event.waitUntil(self.registration.showNotification(title, { body: body, icon: icon, tag: tag }));
});