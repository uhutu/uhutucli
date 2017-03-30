"use strict";
var CommonRoot = require("../../base/common/root");
var InitConfig = require("../../cli/exec-init/init_config");
var InitInstall = require("../../cli/exec-init/init_install");
var InitBuild = require("../../cli/exec-init/init_build");
var LoadConfig = require("../../cli/exec-load/load_config");
var UtilsIo = require("../../base/utils/io");
var MstartBase = (function () {
    function MstartBase() {
    }
    MstartBase.prototype.initStart = function (oEnv) {
        this._initSystem(oEnv);
        CommonRoot.logInfo(960312001);
        this._initFormatEnv(oEnv);
        CommonRoot.logDebug(970312001, JSON.stringify(oEnv));
        //判断如果是初始化配置文件
        if (oEnv.argsConfig) {
            InitConfig.initStart(oEnv);
        }
        else {
            //判断是否存在配置文件  如果不存在则报错
            if (InitConfig.flagExistConfig(oEnv)) {
                var localConfig = LoadConfig.upConfig(oEnv);
                if (oEnv.argsInstall) {
                    InitInstall.initStart(localConfig);
                }
                if (oEnv.argsBuild) {
                    InitBuild.initStart(localConfig);
                }
            }
            else {
                CommonRoot.logError(930312001);
            }
        }
        CommonRoot.logInfo(960312002);
    };
    MstartBase.prototype._initSystem = function (oEnv) {
        if (oEnv.argsLog) {
            CommonRoot.setLogLevel(oEnv.argsLog);
        }
    };
    /**
     * 本地重新初始化格式变量
     * @param envs
     */
    MstartBase.prototype._initFormatEnv = function (oEnv) {
        oEnv.pathCli = UtilsIo.parentTop(oEnv.pathStart, 3);
    };
    return MstartBase;
}());
module.exports = new MstartBase();
