function GwSessionStorge() {
}

GwSessionStorge.prototype.set = function(key, data) {
    sessionStorage.removeItem(key);
    return sessionStorage.setItem(key, JSON.stringify(data));
};
GwSessionStorge.prototype.get = function(key) {
    res = sessionStorage.getItem(key);
    return JSON.parse(res);
};
GwSessionStorge.prototype.remove = function(key) {
    return sessionStorage.removeItem(key);
};
GwSessionStorge.prototype.clear = function() {
    sessionStorage.clear();
};


var gwSessionStorge = new GwSessionStorge();