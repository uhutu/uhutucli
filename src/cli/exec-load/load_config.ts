import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import DefineConfig = require("../../cli/default-define/define_config");

let RegexStrBegin = "[@";
let RegexStrEnd = "]";

class Mexport {

    upConfig(oEnv: AimLocal.IAimLocalNexusEnv): AimLocal.IAimLocalConfig {


        //加载app的配置
        var appConfig = CommonUtil.utilsIo.upConfigByFile(CommonUtil.utilsIo.pathJoin(oEnv.pathCwd, oEnv.fileConfig));
        //console.log(oEnv);
        //深度克隆配置
        let oLocalConfig = CommonUtil.utilsHelper.deepAssign(DefineConfig.upConfig(oEnv), appConfig);

        oLocalConfig = this.autoConfig(oLocalConfig);

        

        this.saveConfigInfo(oLocalConfig);

        return oLocalConfig;

    }
    /**
     * 保存配置到文件中存储
     * @param oEnv 
     */
    saveConfigInfo(oLocalConfig: AimLocal.IAimLocalConfig){


        CommonRoot.logDebug(970312002, oLocalConfig.file.diskConfigFile);

        CommonUtil.utilsJson.saveJsonFile(oLocalConfig.file.diskConfigFile,oLocalConfig);

    }

    //循环递归处理配置文件
    autoConfig(oConfig) {
        var sJson = JSON.stringify(oConfig);

        var sResult = this.formatConfigString(sJson, oConfig);

        oConfig = JSON.parse(sResult);
        if (sResult.indexOf(RegexStrBegin) > -1) {
            oConfig = this.autoConfig(oConfig);
        }
        return oConfig;

    }


    formatConfigString(sStr, oConfig) {
        var reg = new RegExp("\\" + RegexStrBegin + "(.*?):(.*?)\\" + RegexStrEnd, "g");
        var aExec = sStr.match(reg);
        var sReturn = sStr;
        let r = [];
        while (r = reg.exec(sStr)) {
            if (r[1] === "config") {
                var sValue = CommonUtil.utilsObject.readProp(oConfig, r[2]);
                if (sValue == undefined) {

                    CommonRoot.logWarn(930312002, r[2]);
                }
                else if (sValue.indexOf(RegexStrBegin) === -1) {
                    sReturn = sReturn.replace(r[0], CommonUtil.utilsObject.readProp(oConfig, r[2]));
                }
            }
        }
        return sReturn;
    }


}


export =new Mexport();