"use strict";
var UtilsIo = require("../../base/utils/io");
var MinitProject = (function () {
    function MinitProject() {
    }
    MinitProject.prototype.initStart = function (envs) {
        if (!this.flagExistConfig(envs)) {
            UtilsIo.copyFileAsync(this._upSourceFile(envs), this._upTargetFile(envs));
        }
    };
    MinitProject.prototype._upSourceFile = function (envs) {
        return UtilsIo.pathJoin(envs.pathCli, envs.dirTemplateInit, envs.fileConfig);
    };
    MinitProject.prototype._upTargetFile = function (envs) {
        return UtilsIo.pathJoin(envs.pathCwd, envs.fileConfig);
    };
    MinitProject.prototype.flagExistConfig = function (envs) {
        return UtilsIo.flagExist(this._upTargetFile(envs));
    };
    return MinitProject;
}());
module.exports = new MinitProject();
