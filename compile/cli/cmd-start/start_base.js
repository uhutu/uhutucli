"use strict";
var CommonRoot = require("../../base/common/root");
var InitProject = require("../../cli/exec-init/init_project");
var UtilsIo = require("../../base/utils/io");
var MstartBase = (function () {
    function MstartBase() {
    }
    MstartBase.prototype.initStart = function (envs) {
        this._initFormatEnv(envs);
        CommonRoot.logDebug(972001001, JSON.stringify(envs));
        if (envs.argsInit) {
            InitProject.initStart(envs);
        }
        else {
        }
    };
    /**
     * 本地重新初始化格式变量
     * @param envs
     */
    MstartBase.prototype._initFormatEnv = function (envs) {
        envs.pathCli = UtilsIo.parentPath(envs.pathStart);
    };
    return MstartBase;
}());
module.exports = new MstartBase();
