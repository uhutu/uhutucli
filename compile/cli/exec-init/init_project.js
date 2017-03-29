"use strict";
var UtilsIo = require("../../base/utils/io");
var InitProject = (function () {
    function InitProject() {
    }
    InitProject.prototype.initStart = function (envs) {
        if (!this.flagExistConfig(envs)) {
            UtilsIo.copyFileAsync(this._upSourceFile(envs), this._upTargetFile(envs));
        }
    };
    InitProject.prototype._upSourceFile = function (envs) {
        return UtilsIo.pathJoin(envs.pathCli, envs.dirTemplateInit, envs.fileConfig);
    };
    InitProject.prototype._upTargetFile = function (envs) {
        return UtilsIo.pathJoin(envs.pathCwd, envs.fileConfig);
    };
    InitProject.prototype.flagExistConfig = function (envs) {
        return UtilsIo.flagExist(this._upTargetFile(envs));
    };
    return InitProject;
}());
module.exports = new InitProject();
