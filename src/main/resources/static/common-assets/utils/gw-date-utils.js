function GwDateUtils() {
}

GwDateUtils.prototype.strDateCompare = function (dStr1, dStr2, justDay) {
    if (true == justDay) {
        dStr1 = dStr1.substring(0, 10);
        dStr2 = dStr2.substring(0, 10);
    }
    dStr1 = dStr1.replace(/-/g, "\/");//替换字符，变成标准格式
    dStr2 = dStr2.replace(/-/g, "\/");//替换字符，变成标准格式
    d1 = new Date(Date.parse(dStr1));
    d2 = new Date(Date.parse(dStr2));
    if (d1 < d2) {
        return -1;
    } else if (d1 > d2) {
        return 1;
    } else {
        return 0;
    }
};

var gwDateUtils = new GwDateUtils();