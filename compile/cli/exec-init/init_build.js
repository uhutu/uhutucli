"use strict";
var CommonUtil = require("../../base/common/util");
var MinitConfig = (function () {
    function MinitConfig() {
    }
    MinitConfig.prototype.initStart = function (oLocalConfig) {
        if (!CommonUtil.utilsString.isEmpty(oLocalConfig.env.argsBuild)) {
            CommonUtil.utilsHelper.spawnSync("./node_modules/.bin/gulp", ["--diskconfig=" + oLocalConfig.file.diskConfigFile], { cwd: oLocalConfig.define.cliSpace });
            if (CommonUtil.utilsString.contains(oLocalConfig.env.argsBuild, 'start')) {
                CommonUtil.utilsHelper.spawn("npm", ["start"], { cwd: oLocalConfig.appReact.workPath });
            }
        }
    };
    return MinitConfig;
}());
module.exports = new MinitConfig();
