import Log4js = require("log4js");

import CommonUtil = require("../../base/common/util");

let logger = Log4js.getLogger("u");
logger.setLevel('info');

var cProperty = {

    regexOutBegin: "[#",
    regexOutEnd: "]",

    regexBaseString: "(.*?):(.*?)",

    noteMessageBegin: "uhutu_autonotebegin_",
    noteMessageEnd: "uhutu_autonoteend_",

    pageElmentForm:'fform',
    pageElementTemplate:'template',
    formNameSplit:'---',
    formBaseAttr:'name',

    templateSourceName:'source',

    defaultName:'default'


}


class RootResult{
    resultCode:number=1
    resultMessage:string=""
    upFlagOk():boolean{
        return this.resultCode===1;
    }
    inError(iLogCode: number, aArgs: string[]){
        this.resultCode=iLogCode;
        mcommonRoot.logAuto(iLogCode,aArgs);

    }
}



class McommonRoot {

    /**
     * 自动日志输出  一般不要调用该方法 调用debug/info等日志类型
     * 
     * @param {number} iLogCode  日志格式为：9+级别编号+4位分类标识+3位流水号，级别编号:0:EMERGENCY,1:ALERT,2:CRITICAL,3:ERROR,4:WARNING,5:NOTICE,6:INFO,7:DEBUG
     * @param {...string[]} aArgs 
     * 
     * @memberOf McommonRoot
     */
    logAuto(iLogCode: number, aArgs: string[]) {

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



    }

    logDebug(iLogCode: number, aArgs?: string | string[]) {

        logger.debug(logLoad.upLogInfo(iLogCode, aArgs));
    }

    logInfo(iLogCode: number, aArgs?: string | string[]) {

        logger.info(logLoad.upLogInfo(iLogCode, aArgs));
    }

    logWarn(iLogCode: number, aArgs?: string | string[]) {

        logger.warn(logLoad.upLogInfo(iLogCode, aArgs));
    }
    logError(iLogCode: number, aArgs?: string | string[]) {

        logger.error(logLoad.upLogInfo(iLogCode, aArgs));
    }



    upResult(){
        return new RootResult();
    }


    upProperty() {
        return cProperty;
    }
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
                case 4:
                sReturn="<!-- "+sReturn+" -->";
                break;
        }

        return sReturn;
    }

    inLogLevel(sLogType: string) {
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


const mcommonRoot=new McommonRoot();

export =mcommonRoot;
