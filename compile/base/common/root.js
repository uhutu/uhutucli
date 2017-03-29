"use strict";
var Log = require("log");
var log = new Log("info");
var CommonRoot = (function () {
    function CommonRoot() {
    }
    CommonRoot.prototype.logDebug = function (iLogCode) {
        var as = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            as[_i - 1] = arguments[_i];
        }
        log.debug(as);
    };
    return CommonRoot;
}());
module.exports = new CommonRoot();
