"use strict";
var ModuleInstall = require("../../cli/module-react/module_install");
var MinitInstall = (function () {
    function MinitInstall() {
    }
    MinitInstall.prototype.initStart = function (oLocalConfig) {
        ModuleInstall.installProject(oLocalConfig);
    };
    return MinitInstall;
}());
module.exports = new MinitInstall();
