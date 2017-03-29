"use strict";
var UtilsIo = require("../../base/utils/io");
var MinitConfig = (function () {
    function MinitConfig() {
    }
    MinitConfig.prototype.initStart = function (envs) {
        if (!this.flagExistConfig(envs)) {
            UtilsIo.copyFileAsync(this._upSourceFile(envs), this._upTargetFile(envs));
        }
    };
    MinitConfig.prototype._upSourceFile = function (envs) {
        return UtilsIo.pathJoin(envs.pathCli, envs.dirTemplateInit, envs.fileConfig);
    };
    MinitConfig.prototype._upTargetFile = function (envs) {
        return UtilsIo.pathJoin(envs.pathCwd, envs.fileConfig);
    };
    MinitConfig.prototype.flagExistConfig = function (envs) {
        return UtilsIo.flagExist(this._upTargetFile(envs));
    };
    return MinitConfig;
}());
module.exports = new MinitConfig();
