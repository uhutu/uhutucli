import CommonRoot = require("../../base/common/root");


import UtilsIo = require("../../base/utils/io");
import UtilsObject = require("../../base/utils/object");
import UtilsHelper = require("../../base/utils/helper");

import * as AimLocal from "../../cli/aim-top/aim_local";
import DefineConfig = require("../../cli/default-define/define_config");

let RegexStrBegin = "[@";
let RegexStrEnd = "]";

class Mexport {

    upConfig(oEnv: AimLocal.IAimLocalEnv): AimLocal.IAimLocalConfig {


        //加载app的配置
        var appConfig = UtilsIo.upConfigByFile(UtilsIo.pathJoin(oEnv.pathCwd, oEnv.fileConfig));
        //console.log(oEnv);
        //深度克隆配置
        let oLocalConfig = UtilsHelper.deepAssign(DefineConfig.upConfig(oEnv), appConfig);

        oLocalConfig = this.autoConfig(oLocalConfig);

        CommonRoot.logDebug(972001002, JSON.stringify(oLocalConfig));

        return oLocalConfig;

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
                var sValue = UtilsObject.readProp(oConfig, r[2]);
                if (sValue == undefined) {

                    CommonRoot.logWarn(932001002, r[2]);
                }
                else if (sValue.indexOf(RegexStrBegin) === -1) {
                    sReturn = sReturn.replace(r[0], UtilsObject.readProp(oConfig, r[2]));
                }
            }
        }
        return sReturn;
    }


}


export =new Mexport();