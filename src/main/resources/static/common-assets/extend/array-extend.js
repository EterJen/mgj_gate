/*移除第一次见到*/
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.commonComapre = function (v1, v2) {
    var value1 = v1.sortNumber;
    var value2 = v2.sortNumber;

    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
};

Array.prototype.commonSort = function () {
    this.sort(this.commonComapre)
}

Array.prototype.removeAll = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
        if (this.indexOf(val) > -1) {
            this.removeAll(val);
        }
    }
};
Array.prototype.contain = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return true;
        }
    }
    return false;
};
/*包含*/
Array.prototype.unique = function () {
    var hash = [];
    for (var i = 0; i < this.length; i++) {
        if (this.indexOf(this[i]) == i) {
            hash.push(this[i]);
        }
    }
    return hash;
};
/*包含*/
Array.prototype.contains = function (obj) {
    var index = this.length;
    while (index--) {
        if (this[index] === obj) {
            return true;
        }
    }
    return false;
};