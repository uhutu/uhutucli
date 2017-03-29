import Log4js = require("log4js");

import UtilsJson = require("../../base/utils/json");
import UtilsIo = require("../../base/utils/io");
import UtilsString = require("../../base/utils/string");
let logger =  Log4js.getLogger("u");

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
}

class LogLoad {

    _currentMap: Map<string, string> = new Map();

    _flagInitMap = false;

    constructor() {
        var sCliRoot = UtilsIo.parentTop(__dirname, 3);
        let sContent = UtilsIo.readFile(UtilsIo.pathJoin(sCliRoot, "resources/files-local/log-info/cli_log.json"));
        let aJson = UtilsJson.parse(sContent);
        for (var p in aJson) {
            this._currentMap.set(p, aJson[p]);
        }

    }

    upLogInfo(iLogCode: number, ...aArgs) {



        return iLogCode + ' ' + UtilsString.formatString(this.upLogInfoByCode(iLogCode), aArgs);

    }

    upLogInfoByCode(iLogCode: number) {
        return this._currentMap.get(iLogCode.toString());

    }
}

const logLoad = new LogLoad();


export =new McommonRoot();
