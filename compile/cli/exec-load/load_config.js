"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var DefineConfig = require("../../cli/default-define/define_config");
var RegexStrBegin = "[@";
var RegexStrEnd = "]";
var Mexport = (function () {
    function Mexport() {
    }
    Mexport.prototype.upConfig = function (oEnv) {
        //加载app的配置
        var appConfig = CommonUtil.utilsIo.upConfigByFile(CommonUtil.utilsIo.pathJoin(oEnv.pathCwd, oEnv.fileConfig));
        //console.log(oEnv);
        //深度克隆配置
        var oLocalConfig = CommonUtil.utilsHelper.deepAssign(DefineConfig.upConfig(oEnv), appConfig);
        oLocalConfig = this.autoConfig(oLocalConfig);
        CommonRoot.logDebug(972001002, JSON.stringify(oLocalConfig));
        return oLocalConfig;
    };
    //循环递归处理配置文件
    Mexport.prototype.autoConfig = function (oConfig) {
        var sJson = JSON.stringify(oConfig);
        var sResult = this.formatConfigString(sJson, oConfig);
        oConfig = JSON.parse(sResult);
        if (sResult.indexOf(RegexStrBegin) > -1) {
            oConfig = this.autoConfig(oConfig);
        }
        return oConfig;
    };
    Mexport.prototype.formatConfigString = function (sStr, oConfig) {
        var reg = new RegExp("\\" + RegexStrBegin + "(.*?):(.*?)\\" + RegexStrEnd, "g");
        var aExec = sStr.match(reg);
        var sReturn = sStr;
        var r = [];
        while (r = reg.exec(sStr)) {
            if (r[1] === "config") {
                var sValue = CommonUtil.utilsObject.readProp(oConfig, r[2]);
                if (sValue == undefined) {
                    CommonRoot.logWarn(932001002, r[2]);
                }
                else if (sValue.indexOf(RegexStrBegin) === -1) {
                    sReturn = sReturn.replace(r[0], CommonUtil.utilsObject.readProp(oConfig, r[2]));
                }
            }
        }
        return sReturn;
    };
    return Mexport;
}());
module.exports = new Mexport();
