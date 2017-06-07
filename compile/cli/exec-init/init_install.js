"use strict";
var CommonRoot = require("../../base/common/root");
var ModuleReact = require("../../cli/module-install/module_react");
var ModuleVue = require("../../cli/module-install/module_vue");
var MinitInstall = (function () {
    function MinitInstall() {
    }
    MinitInstall.prototype.initStart = function (oLocalConfig) {
        if (!oLocalConfig.appReact.disable) {
            CommonRoot.logDebug(970312007, oLocalConfig.appReact.appType);
            ModuleReact.installProject(oLocalConfig);
        }
        if (!oLocalConfig.appVue.disable) {
            CommonRoot.logDebug(970312007, oLocalConfig.appVue.appType);
            ModuleVue.installProject(oLocalConfig);
        }
    };
    return MinitInstall;
}());
module.exports = new MinitInstall();
