"use strict";
var DefineEnv = /** @class */ (function () {
    function DefineEnv() {
        this.fileConfig = "config.json";
        this.dirTemplateInit = "resources/files-template/project-init";
        this.argsConfig = false;
        this.argsInstall = false;
        this.argsForce = false;
        this.argsBuild = false;
        this.argsLog = "info";
    }
    return DefineEnv;
}());
var MAimLocalEnv = /** @class */ (function () {
    function MAimLocalEnv() {
    }
    MAimLocalEnv.prototype.upEnv = function () {
        return new DefineEnv();
    };
    return MAimLocalEnv;
}());
module.exports = new MAimLocalEnv();
