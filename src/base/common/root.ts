import Log4js = require("log4js");

import CommonUtil = require("../../base/common/util");

let logger = Log4js.getLogger("u");
logger.setLevel('info');

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
