"use strict";
var utils_io = require("../utils/io");
var InitProject = (function () {
    function InitProject() {
    }
    InitProject.prototype.initStart = function (envs) {
        var sourceFile = utils_io.pathJoin(envs.pathCli, envs.dirTemplateInit, envs.fileConfig);
        var sTargetFile = utils_io.pathJoin(envs.pathCwd, envs.fileConfig);
        if (!utils_io.flagExist(sTargetFile)) {
            utils_io.copyFileAsync(sourceFile, sTargetFile);
        }
    };
    return InitProject;
}());
module.exports = new InitProject();
