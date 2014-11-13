'use strict';

var isDate = function(val) {
    var d = new Date(val);
    return !isNaN(d.valueOf());
};

var normalizeDate = function(date) {
    if(isDate(date)) {
        date = new Date(date);
        return new Date((date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear());
    } else {
        return null;
    }
};

var aWeekLater = function(date) {
    if(date && isDate(date)) {
        date = new Date(date);
        date = date.setDate(date.getDate() + 7);
        return date;
    } else {
        var now = new Date();
        now.setDate(now.getDate() + 7);
        return now;
    }
};

module.exports = {
    isDate: isDate,
    normalizeDate: normalizeDate,
    aWeekLater: aWeekLater
};