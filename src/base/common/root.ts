import Log = require("log");

import UtilsJson = require("../../base/utils/json");
import UtilsIo = require("../../base/utils/io");

let log = new Log();

class McommonRoot {

    logDebug(iLogCode: number, ...as) {

        log.debug(logLoad.upLogInfoByCode(iLogCode), as);
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

    upLogInfoByCode(iLogCode: number) {
        return this._currentMap.get(iLogCode.toString());

    }
}

const logLoad = new LogLoad();


export =new McommonRoot();
