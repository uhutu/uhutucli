"use strict";
var UtilsHelper = require("../../base/utils/helper");
var UtilsIo = require("../../base/utils/io");
var CommonRoot = require("../../base/common/root");
var MmoduleInstall = (function () {
    function MmoduleInstall() {
    }
    MmoduleInstall.prototype.installProject = function (oLocalConfig) {
        if (!UtilsIo.flagExist(oLocalConfig.appReact.workName)) {
            UtilsHelper.spawnSync("react-native", ["init", oLocalConfig.appReact.workName], { cwd: oLocalConfig.env.pathCwd });
        }
        else {
            CommonRoot.logDebug(972001003, oLocalConfig.appReact.workName);
        }
    };
    return MmoduleInstall;
}());
module.exports = new MmoduleInstall();
