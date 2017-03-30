"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var LoadPlug = require("../../cli/exec-load/load_plug");
var MmoduleInstall = (function () {
    function MmoduleInstall() {
    }
    MmoduleInstall.prototype.installProject = function (oLocalConfig) {
        this.checkWork(oLocalConfig);
        this.checkPackage(oLocalConfig);
        LoadPlug.processPlus(oLocalConfig, ["react", "ios", "android"]);
    };
    /**
     * 判断应用是否存在
     * @param oLocalConfig
     */
    MmoduleInstall.prototype.checkWork = function (oLocalConfig) {
        if (!CommonUtil.utilsIo.flagExist(oLocalConfig.appReact.workName)) {
            CommonUtil.utilsHelper.spawnSync("react-native", ["init", oLocalConfig.appReact.workName], { cwd: oLocalConfig.define.workSpace });
        }
        else {
            CommonRoot.logDebug(970312003, oLocalConfig.appReact.workName);
        }
    };
    /**
     * 检查包的配置
     * @param oLocalConfig
     */
    MmoduleInstall.prototype.checkPackage = function (oLocalConfig) {
        var oPackage = CommonUtil.utilsIo.upConfigByFile(oLocalConfig.file.reactPackage);
        var aPlugs = [];
        for (var p in oLocalConfig.plugs) {
            var f = oLocalConfig.plugs[p];
            if (!CommonUtil.utilsString.isEmpty(f.version)) {
                if (!oPackage.dependencies.hasOwnProperty(f.name) || oPackage.dependencies[f.name] != f.version) {
                    oPackage.dependencies[f.name] = f.version;
                    aPlugs.push(f.name);
                }
            }
        }
        if (aPlugs.length > 0) {
            if (!oPackage.hasOwnProperty("links")) {
                oPackage.links = {};
            }
            CommonUtil.utilsJson.saveJsonFile(oLocalConfig.file.reactPackage, oPackage);
            CommonUtil.utilsHelper.spawnSync('npm', ['install'], { cwd: oLocalConfig.appReact.workPath });
        }
    };
    MmoduleInstall.prototype.checkPlug = function (oLocalConfig) {
    };
    return MmoduleInstall;
}());
module.exports = new MmoduleInstall();
