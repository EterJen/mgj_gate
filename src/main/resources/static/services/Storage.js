myApp.service('Storage', function() {
		  
	this.set = function(key, data) {
		return window.localStorage.setItem(key, window.JSON.stringify(data));
	};
	
	this.get = function(key) {
		return window.JSON.parse(window.localStorage.getItem(key));
	};
	
	this.remove = function(key) {
		return window.localStorage.removeItem(key);
	};
	
});

