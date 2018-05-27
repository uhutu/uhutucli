"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var MinitConfig = /** @class */ (function () {
    function MinitConfig() {
    }
    /**
     * 初始化一个配置文件
     *
     * @param {AimLocal.IAimLocalNexusEnv} envs
     *
     * @memberOf MinitConfig
     */
    MinitConfig.prototype.initStart = function (envs) {
        if (!this.flagExistConfig(envs)) {
            CommonUtil.utilsIo.copyFile(this._upSourceFile(envs), this._upTargetFile(envs));
        }
        else {
            CommonRoot.logError(930312004);
        }
    };
    MinitConfig.prototype._upSourceFile = function (envs) {
        return CommonUtil.utilsIo.pathJoin(envs.pathCli, envs.dirTemplateInit, envs.fileConfig);
    };
    MinitConfig.prototype._upTargetFile = function (envs) {
        return CommonUtil.utilsIo.pathJoin(envs.pathCwd, envs.fileConfig);
    };
    /**
     * 判断是否存在配置文件
     *
     * @param {AimLocal.IAimLocalNexusEnv} envs
     * @returns {boolean}
     *
     * @memberOf MinitConfig
     */
    MinitConfig.prototype.flagExistConfig = function (envs) {
        return CommonUtil.utilsIo.flagExist(this._upTargetFile(envs));
    };
    return MinitConfig;
}());
module.exports = new MinitConfig();
