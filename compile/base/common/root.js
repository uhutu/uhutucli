"use strict";
var Log = require("log");
var UtilsJson = require("../../base/utils/json");
var UtilsIo = require("../../base/utils/io");
var log = new Log();
var McommonRoot = (function () {
    function McommonRoot() {
    }
    McommonRoot.prototype.logDebug = function (iLogCode) {
        var as = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            as[_i - 1] = arguments[_i];
        }
        logLoad.upLogInfoByCode(iLogCode);
        log.debug(logLoad.upLogInfoByCode(iLogCode), as);
    };
    return McommonRoot;
}());
var LogLoad = (function () {
    function LogLoad() {
        this._currentMap = new Map();
        this._flagInitMap = false;
        if (!this._flagInitMap) {
            var sCliRoot = UtilsIo.parentTop(__dirname, 3);
            var sContent = UtilsIo.readFile(UtilsIo.pathJoin(sCliRoot, "resources/files-local/log-info/cli_log.json"));
            var aJson = UtilsJson.parse(sContent);
            for (var p in aJson) {
                this._currentMap.set(p, aJson[p]);
            }
            this._flagInitMap = true;
        }
    }
    LogLoad.prototype.upLogInfoByCode = function (iLogCode) {
        return this._currentMap.get(iLogCode.toString());
    };
    return LogLoad;
}());
var logLoad = new LogLoad();
module.exports = new McommonRoot();
