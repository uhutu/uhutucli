"use strict";
var MmoduleInstall = (function () {
    function MmoduleInstall() {
    }
    MmoduleInstall.prototype.installProject = function (oLocalConfig) {
        //UtilsHelper.spawnSync("react-native",["init",oConfig.apps.react.work_name],{cwd:oConfig.project.out_path});
    };
    return MmoduleInstall;
}());
module.exports = new MmoduleInstall();
