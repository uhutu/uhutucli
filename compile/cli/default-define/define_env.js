"use strict";
var DefineEnv = (function () {
    function DefineEnv() {
        this.fileConfig = "config.json";
        this.dirTemplateInit = "resources/files-template/project-init";
        this.argsInit = false;
        this.argsForce = false;
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
