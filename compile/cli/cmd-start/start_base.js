"use strict";
var CommonRoot = require("../../base/common/root");
var InitConfig = require("../../cli/exec-init/init_config");
var UtilsIo = require("../../base/utils/io");
var MstartBase = (function () {
    function MstartBase() {
    }
    MstartBase.prototype.initStart = function (envs) {
        this._initFormatEnv(envs);
        CommonRoot.logDebug(972001001, JSON.stringify(envs));
        if (envs.argsConfig) {
            InitConfig.initStart(envs);
        }
        else {
            if (InitConfig.flagExistConfig(envs)) {
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
