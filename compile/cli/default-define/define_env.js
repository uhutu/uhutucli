"use strict";
var DefineEnv = (function () {
    function DefineEnv() {
        this.fileConfig = "config.json";
        this.dirTemplateInit = "resources/files-template/project-init";
        this.argsConfig = false;
        this.argsInstall = false;
        this.argsForce = false;
        this.argsLog = "info";
    }
    return DefineEnv;
}());
var MAimLocalEnv = (function () {
    function MAimLocalEnv() {
    }
    MAimLocalEnv.prototype.upEnv = function () {
        return new DefineEnv();
    };
    return MAimLocalEnv;
}());
module.exports = new MAimLocalEnv();
