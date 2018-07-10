"use strict";
var LoadPlug = require("../../cli/exec-load/load_plug");
var MmoduleVue = /** @class */ (function () {
    function MmoduleVue() {
    }
    MmoduleVue.prototype.installProject = function (oLocalConfig) {
        oLocalConfig.plugVue = LoadPlug.refreshPlug(oLocalConfig, oLocalConfig.appVue, oLocalConfig.plugVue);
        this.checkWork(oLocalConfig);
        LoadPlug.processPlus(oLocalConfig, oLocalConfig.plugVue, ["all"]);
    };
    /**
     * 判断应用是否存在
     * @param oLocalConfig
     */
    MmoduleVue.prototype.checkWork = function (oLocalConfig) {
    };
    return MmoduleVue;
}());
module.exports = new MmoduleVue();
