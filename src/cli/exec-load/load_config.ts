import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import DefineConfig = require("../../cli/default-define/define_config");

let RegexStrBegin = "[@";
let RegexStrEnd = "]";

class Mexport {

    /**
     * 获取配置项 根据环境变量标记
     * 
     * @param {AimLocal.IAimLocalNexusEnv} oEnv 
     * @returns {AimLocal.IAimLocalConfig} 
     * 
     * @memberOf Mexport
     */
    upConfig(oEnv: AimLocal.IAimLocalNexusEnv): AimLocal.IAimLocalConfig {



        let sConfigFilePath=CommonUtil.utilsIo.pathJoin(oEnv.pathCwd, oEnv.fileConfig);

        //加载app的配置
        var appConfig = {};

        if(CommonUtil.utilsIo.flagExist(sConfigFilePath)){
            appConfig=CommonUtil.utilsIo.upConfigByFile(sConfigFilePath);
        }

        //console.log(oEnv);
        //深度克隆配置
        let oLocalConfig = CommonUtil.utilsHelper.deepAssign(DefineConfig.upConfig(oEnv), appConfig);

        oLocalConfig = this.autoConfig(oLocalConfig);



        this.saveConfigInfo(oLocalConfig);

        return oLocalConfig;

    }
    /**
     * 保存配置到文件中存储
     * 
     * @param {AimLocal.IAimLocalConfig} oLocalConfig 
     * 
     * @memberOf Mexport
     */
    saveConfigInfo(oLocalConfig: AimLocal.IAimLocalConfig) {


        CommonRoot.logDebug(970312002, oLocalConfig.file.diskConfigFile);

        CommonUtil.utilsJson.saveJsonFile(oLocalConfig.file.diskConfigFile, oLocalConfig);

    }


    upCliVersion(oLocalConfig: AimLocal.IAimLocalConfig): boolean {



        let bReturn = true;

        CommonRoot.logDebug(970312006, oLocalConfig.system.cliVersion);

        if (oLocalConfig.system.cliVersion != undefined && !CommonUtil.utilsString.isEmpty(oLocalConfig.system.cliVersion)) {



            let oJson = CommonUtil.utilsJson.readJsonFile(CommonUtil.utilsIo.pathJoin(oLocalConfig.define.cliSpace, "package.json"));

            

            if (oJson != undefined && oJson.version != undefined && oJson.version != oLocalConfig.system.cliVersion) {

                let sVersion = oJson.version;

                CommonRoot.logWarn(940312001, [oLocalConfig.system.cliVersion, sVersion]);


                CommonUtil.utilsHelper.spawnSync("npm", ["install", "-g", oJson.name + "@" + oLocalConfig.system.cliVersion], { cwd: oLocalConfig.define.workSpace });

                CommonRoot.logWarn(940312002);
                bReturn = false;
            }

        }




        return bReturn;
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