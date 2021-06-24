function GwObjectUtils() {
}

GwObjectUtils.prototype.isTrue = function (obj) {
    if (obj === null || obj === undefined) {
        return false;
    } else if (Object.prototype.toString.call(obj) === '[object String]') {
        return obj === "true" ? true : false;
    } else {
        return obj == false ? false : true;
    }
};

/*以前者为基准比较属性　*/
GwObjectUtils.prototype.objEq = function (obj, other, ignoreEmptyObj,ignoreEmptyOther) {
    var self = this;
    if (self.objEmpty(obj, [])) {/*空处理*/
        return ignoreEmptyObj || self.objEmpty(other, []);/*被比较对象空值忽略否*/
    } else if (self.objEmpty(other, [])) {
        return ignoreEmptyOther || self.objEmpty(obj, []);
    } else if (Object.prototype.toString.call(obj) === Object.prototype.toString.call(other)) {/*类型相同*/

        if (Object.prototype.toString.call(obj) === '[object Object]') {
            res = true;
            for (key in obj) {
                if (res) {
                    res = res && self.objEq(obj[key],other[key],ignoreEmptyObj,ignoreEmptyOther);
                } else {
                    break;
                }
            }
            return res;
        } else {
            return obj == other;
        }
    } else {/*类型不同*/
        return false;
    }
}
GwObjectUtils.prototype.notEmpty = function (obj, attr) {
    var self = this;
    if (obj === null || obj === undefined) {
        return false;
    } else if (Object.prototype.toString.call(obj) === '[object String]') {
        if (obj.trim() === "") {
            return false;
        }
    } else if (Object.prototype.toString.call(obj) === '[object Number]') {
        if (isNaN(obj)) {
            return false;
        }
    } else if (Object.prototype.toString.call(obj) === '[object Array]') {
        if (attr == false) {
            return !(obj == false); //数组非空
        } else {
            var newObj = obj[attr[0]];
            var newAttr = attr.slice(1);
            return self.notEmpty(newObj, newAttr);
        }
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        var arr = Object.getOwnPropertyNames(obj);
        if (arr.length == 0) {
            return false;
        } else if (attr == false) {
            return true;
        } else {
            var newObj = obj[attr[0]];
            var newAttr = attr.slice(1);
            return self.notEmpty(newObj, newAttr);
        }
    } else if (Object.prototype.toString.call(obj) === '[object Boolean]') {
        if (!obj) {
            return false;
        }
    }

    return true;
};
GwObjectUtils.prototype.objEmpty = function (obj, attr) {
    var self = this;
    return !self.notEmpty(obj, attr);
}
GwObjectUtils.prototype.objNotEmpty = function (obj, attr) {
    var self = this;
    return self.notEmpty(obj, attr);
}
var gwObjectUtils = new GwObjectUtils();