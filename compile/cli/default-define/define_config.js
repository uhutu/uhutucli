"use strict";
var DefineConfig = (function () {
    function DefineConfig() {
    }
    return DefineConfig;
}());
var MAimLocalEnv = (function () {
    function MAimLocalEnv() {
    }
    MAimLocalEnv.prototype.upConfig = function (oEnv) {
        var defineConfig = new DefineConfig();
        defineConfig.envs = oEnv;
        return defineConfig;
    };
    return MAimLocalEnv;
}());
module.exports = new MAimLocalEnv();
