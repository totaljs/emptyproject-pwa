('serviceWorker' in navigator) && navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
	// Registration was successful
}).catch(function(err) {
	// Registration failed
	console.log('ServiceWorker registration failed:', err);
});