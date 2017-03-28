"use strict";
var init_project = require("../exec-init/init_project");
var StartBase = (function () {
    function StartBase() {
    }
    StartBase.prototype.initStart = function (envs) {
        this._initFormatEnv(envs);
        console.log(envs);
        if (envs.argsInit) {
            init_project.initStart(envs);
        }
    };
    /**
     * 本地重新初始化格式变量
     * @param envs
     */
    StartBase.prototype._initFormatEnv = function (envs) {
    };
    return StartBase;
}());
module.exports = new StartBase();
