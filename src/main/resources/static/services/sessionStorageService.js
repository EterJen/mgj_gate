myApp.service("sessionStorageService", ['$q',function($q) {
    this.key_cu = "jyj_cms_cu";
    this.key_ssoLogined = "mgjgate_key_ssoLogined";
    this.key_ukeySsoAble = "jyj_cms_ukeySsoAble";
    this.hasRoleNeiQin = "false";

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


}]);

