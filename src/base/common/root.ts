import Log4js = require("log4js");

import CommonUtil = require("../../base/common/util");

let logger = Log4js.getLogger("u");
logger.setLevel('info');

var cProperty = {

    regexOutBegin: "[#",
    regexOutEnd: "]",

    regexBaseString: "(.*?):(.*?)",

    noteMessageBegin: "uhutu_autonotebegin_",
    noteMessageEnd: "uhutu_autonoteend_"


}

class McommonRoot {

    logDebug(iLogCode: number, ...aArgs: string[]) {

        logger.debug(logLoad.upLogInfo(iLogCode, aArgs));
    }

    logInfo(iLogCode: number, ...aArgs: string[]) {

        logger.info(logLoad.upLogInfo(iLogCode, aArgs));
    }

    logWarn(iLogCode: number, ...aArgs: string[]) {

        logger.warn(logLoad.upLogInfo(iLogCode, aArgs));
    }
    logError(iLogCode: number, ...aArgs: string[]) {

        logger.error(logLoad.upLogInfo(iLogCode, aArgs));
    }

    upProperty() {
        return cProperty;
    }
    /**
     * 获取注释标记
     * 
     * @param {number} iStep 开始为1  结束为2
     * @param {string} sMessage 标记内容
     * @param {number} iNoteType 注释类型 1:双斜杠 2:井号 3:斜杠加星号
     * @returns 
     * 
     * @memberOf McommonRoot
     */
    upNoteMessage(iStep: number, sMessage: string, iNoteType: number) {

        let sAddMsg = iStep == 1 ? this.upProperty().noteMessageBegin : this.upProperty().noteMessageEnd;

        let sReturn = "";
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
                } else {
                    sReturn = sReturn + " *" + "/";
                }
                break;
        }

        return sReturn;
    }

    setLogLevel(sLogType: string) {
        logger.setLevel(sLogType);
    }
}

class LogLoad {

    _currentMap: Map<string, string> = new Map();

    _flagInitMap = false;

    constructor() {
        var sCliRoot = CommonUtil.utilsIo.parentTop(__dirname, 3);

        var slogPath = CommonUtil.utilsIo.pathJoin(sCliRoot, "resources/files-local/log-info");
        var aFiles = CommonUtil.utilsIo.listDir(slogPath);

        aFiles.forEach(
            sFile => {
                let sContent = CommonUtil.utilsIo.readFile(sFile);
                let aJson = CommonUtil.utilsJson.parse(sContent);
                for (var p in aJson) {
                    this._currentMap.set(p, aJson[p]);
                }
            }
        );



    }

    upLogInfo(iLogCode: number, aArgs) {



        return iLogCode + ' ' + CommonUtil.utilsString.formatString(this.upLogInfoByCode(iLogCode), aArgs);

    }

    upLogInfoByCode(iLogCode: number) {
        return this._currentMap.get(iLogCode.toString());

    }
}

const logLoad = new LogLoad();


export =new McommonRoot();
