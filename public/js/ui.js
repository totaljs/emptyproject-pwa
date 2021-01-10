COMPONENT('serviceworker', 'debug:false;expire:1 day', function(self, config) {

	var messenger;
	var datasource;

	self.singleton();
	self.nocompile();
	self.novalidate();

	self.configure = function(key, value, init, prev) {

		switch (key) {
			case 'datasource':
				self.datasource(value, self.bind);
				break;
		}

	};

	self.init = function() {
		if ('serviceWorker' in navigator) {
			$(document).ready(function() {
				navigator.serviceWorker.register('/sw-jcomponent.js').then(function(registration) {
					messenger = registration.installing || navigator.serviceWorker.controller || registration.active;
				}).catch(console.log);
			});
		}
	};

	self.bind = function(path, value) {

		datasource = value;

		var version = (value.version || '1') + HASH(value.assets.toString());
		if (!value || (version === CACHE('jc-sw-version') && !config.debug))
			return;

		self.updatecache();
	};

	self.setter = function(value, path, type) {
		if (type) {
			datasource.version = value;
			self.updatecache();
		}
	};

	self.updatecache = function() {

		if (!messenger) {
			setTimeout(self.updatecache, 200);
			return;
		}

		var obj = {};
		obj.action = 'jc-sw';
		obj.data = datasource;
		obj.data.version = config.debug ? (new Date().getTime()) : (datasource.version || '1');
		CACHE('jc-sw-version', obj.data.version + HASH(datasource.assets.toString()), config.expire);
		messenger.postMessage(obj);
	};
});
