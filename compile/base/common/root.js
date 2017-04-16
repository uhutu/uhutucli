"use strict";
var Log4js = require("log4js");
var CommonUtil = require("../../base/common/util");
var logger = Log4js.getLogger("u");
logger.setLevel('info');
var cProperty = {
    regexOutBegin: "[#",
    regexOutEnd: "]",
    regexBaseString: "(.*?):(.*?)",
    noteMessageBegin: "uhutu_autonotebegin_",
    noteMessageEnd: "uhutu_autonoteend_",
    pageElmentForm: 'fform',
    pageElementTemplate: 'template',
    formNameSplit: '---',
    formBaseAttr: 'name',
    templateSourceName: 'source',
    defaultName: 'default'
};
var RootResult = (function () {
    function RootResult() {
        this.resultCode = 1;
        this.resultMessage = "";
    }
    RootResult.prototype.upFlagOk = function () {
        return this.resultCode === 1;
    };
    RootResult.prototype.inError = function (iLogCode, aArgs) {
        this.resultCode = iLogCode;
        mcommonRoot.logAuto(iLogCode, aArgs);
    };
    return RootResult;
}());
var McommonRoot = (function () {
    function McommonRoot() {
    }
    /**
     * 自动日志输出  一般不要调用该方法 调用debug/info等日志类型
     *
     * @param {number} iLogCode  日志格式为：9+级别编号+4位分类标识+3位流水号，级别编号:0:EMERGENCY,1:ALERT,2:CRITICAL,3:ERROR,4:WARNING,5:NOTICE,6:INFO,7:DEBUG
     * @param {...string[]} aArgs
     *
     * @memberOf McommonRoot
     */
    McommonRoot.prototype.logAuto = function (iLogCode, aArgs) {
        if (iLogCode > 9) {
            switch (iLogCode.toString().substr(1, 1)) {
                case "3":
                    this.logError(iLogCode, aArgs);
                    break;
                case "4":
                    this.logWarn(iLogCode, aArgs);
                    break;
                case "6":
                    this.logInfo(iLogCode, aArgs);
                    break;
                case "7":
                    this.logDebug(iLogCode, aArgs);
                    break;
            }
        }
    };
    McommonRoot.prototype.logDebug = function (iLogCode, aArgs) {
        logger.debug(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.logInfo = function (iLogCode, aArgs) {
        logger.info(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.logWarn = function (iLogCode, aArgs) {
        logger.warn(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.logError = function (iLogCode, aArgs) {
        logger.error(logLoad.upLogInfo(iLogCode, aArgs));
    };
    McommonRoot.prototype.upResult = function () {
        return new RootResult();
    };
    McommonRoot.prototype.upProperty = function () {
        return cProperty;
    };
    /**
     * 获取注释标记
     *
     * @param {number} iStep 开始为1  结束为2
     * @param {string} sMessage 标记内容
     * @param {number} iNoteType 注释类型 1:双斜杠 2:井号 3:斜杠加星号 4:xml注释
     * @returns
     *
     * @memberOf McommonRoot
     */
    McommonRoot.prototype.upNoteMessage = function (iStep, sMessage, iNoteType) {
        var sAddMsg = iStep == 1 ? this.upProperty().noteMessageBegin : this.upProperty().noteMessageEnd;
        var sReturn = "";
        sReturn = sAddMsg + sMessage;
        switch (iNoteType) {
            case 1:
                sReturn = "// " + sReturn;
                break;
            case 2:
                sReturn = "# " + sReturn;
                break;
            case 3:
                if (iStep == 1) {
                    sReturn = "/" + "* " + sReturn;
                }
                else {
                    sReturn = sReturn + " *" + "/";
                }
                break;
            case 4:
                sReturn = "<!-- " + sReturn + " -->";
                break;
        }
        return sReturn;
    };
    McommonRoot.prototype.inLogLevel = function (sLogType) {
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
var mcommonRoot = new McommonRoot();
module.exports = mcommonRoot;
