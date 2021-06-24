myApp.service("sessionStorage", function() {
		  
	this.set = function(key, data) {
        sessionStorage.removeItem(key);
		return sessionStorage.setItem(key, JSON.stringify(data));
	};
	
	this.get = function(key) {
		return JSON.parse(sessionStorage.getItem(key));
	};
	
	this.remove = function(key) {
		return sessionStorage.removeItem(key);
	};

    this.clear = function() {
         sessionStorage.clear();
    };

	
});

