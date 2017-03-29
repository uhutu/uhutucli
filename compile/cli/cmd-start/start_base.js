"use strict";
var CommonRoot = require("../../base/common/root");
var InitConfig = require("../../cli/exec-init/init_config");
var InitInstall = require("../../cli/exec-init/init_install");
var LoadConfig = require("../../cli/exec-load/load_config");
var UtilsIo = require("../../base/utils/io");
var MstartBase = (function () {
    function MstartBase() {
    }
    MstartBase.prototype.initStart = function (envs) {
        this._initFormatEnv(envs);
        CommonRoot.logDebug(972001001, JSON.stringify(envs));
        //判断如果是初始化配置文件
        if (envs.argsConfig) {
            InitConfig.initStart(envs);
        }
        else {
            //判断是否存在配置文件  如果不存在则报错
            if (InitConfig.flagExistConfig(envs)) {
                var localConfig = LoadConfig.upConfig(envs);
                if (envs.argsInstall) {
                    InitInstall.initStart(localConfig);
                }
            }
            else {
                CommonRoot.logError(932001001);
            }
        }
    };
    /**
     * 本地重新初始化格式变量
     * @param envs
     */
    MstartBase.prototype._initFormatEnv = function (envs) {
        envs.pathCli = UtilsIo.parentPath(envs.pathStart);
    };
    return MstartBase;
}());
module.exports = new MstartBase();
