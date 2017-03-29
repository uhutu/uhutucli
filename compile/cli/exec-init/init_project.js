"use strict";
var utils_io = require("../utils/io");
var InitProject = (function () {
    function InitProject() {
    }
    InitProject.prototype.initStart = function (envs) {
        if (!this.flagExistConfig(envs)) {
            utils_io.copyFileAsync(this._upSourceFile, this._upTargetFile);
        }
    };
    InitProject.prototype._upSourceFile = function (envs) {
        return utils_io.pathJoin(envs.pathCli, envs.dirTemplateInit, envs.fileConfig);
    };
    InitProject.prototype._upTargetFile = function (envs) {
        return utils_io.pathJoin(envs.pathCwd, envs.fileConfig);
    };
    InitProject.prototype.flagExistConfig = function (envs) {
        return utils_io.flagExist(this._upTargetFile(envs));
    };
    return InitProject;
}());
module.exports = new InitProject();
