"use strict";
var Log4js = require("log4js");
var CommonUtil = require("../../base/common/util");
var logger = Log4js.getLogger("u");
logger.setLevel('info');
var cProperty = {
    regexOutBegin: "[#",
    regexOutEnd: "]",
    regexBaseString: "(.*?):(.*?)"
};
var McommonRoot = (function () {
    function McommonRoot() {
    }
    McommonRoot.prototype.logDebug = function (iLogCode) {
        var aArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            aArgs[_i - 1] = arguments[_i];
        }
        logger.debug(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.logInfo = function (iLogCode) {
        var aArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            aArgs[_i - 1] = arguments[_i];
        }
        logger.info(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.logWarn = function (iLogCode) {
        var aArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            aArgs[_i - 1] = arguments[_i];
        }
        logger.warn(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.logError = function (iLogCode) {
        var aArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            aArgs[_i - 1] = arguments[_i];
        }
        logger.error(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.upProperty = function () {
        return cProperty;
    };
    McommonRoot.prototype.setLogLevel = function (sLogType) {
        logger.setLevel(sLogType);
    };
    return McommonRoot;
}());
var LogLoad = (function () {
    function LogLoad() {
        var _this = this;
        this._currentMap = new Map();
        this._flagInitMap = false;
        var sCliRoot = CommonUtil.utilsIo.parentTop(__dirname, 3);
        var slogPath = CommonUtil.utilsIo.pathJoin(sCliRoot, "resources/files-local/log-info");
        var aFiles = CommonUtil.utilsIo.listDir(slogPath);
        aFiles.forEach(function (sFile) {
            var sContent = CommonUtil.utilsIo.readFile(sFile);
            var aJson = CommonUtil.utilsJson.parse(sContent);
            for (var p in aJson) {
                _this._currentMap.set(p, aJson[p]);
            }
        });
    }
    LogLoad.prototype.upLogInfo = function (iLogCode, aArgs) {
        return iLogCode + ' ' + CommonUtil.utilsString.formatString(this.upLogInfoByCode(iLogCode), aArgs);
    };
    LogLoad.prototype.upLogInfoByCode = function (iLogCode) {
        return this._currentMap.get(iLogCode.toString());
    };
    return LogLoad;
}());
var logLoad = new LogLoad();
module.exports = new McommonRoot();
