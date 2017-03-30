"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var MinitConfig = (function () {
    function MinitConfig() {
    }
    MinitConfig.prototype.initStart = function (envs) {
        if (!this.flagExistConfig(envs)) {
            CommonUtil.utilsIo.copyFileAsync(this._upSourceFile(envs), this._upTargetFile(envs));
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
    MinitConfig.prototype.flagExistConfig = function (envs) {
        return CommonUtil.utilsIo.flagExist(this._upTargetFile(envs));
    };
    return MinitConfig;
}());
module.exports = new MinitConfig();
