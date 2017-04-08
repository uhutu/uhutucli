"use strict";
var CommonUtil = require("../../base/common/util");
var MinitConfig = (function () {
    function MinitConfig() {
    }
    MinitConfig.prototype.initStart = function (oLocalConfig) {
        if (!CommonUtil.utilsString.isEmpty(oLocalConfig.env.argsBuild)) {
            CommonUtil.utilsHelper.spawn("./node_modules/gulp/bin/gulp.js", ["--diskconfig=" + oLocalConfig.file.diskConfigFile], { cwd: oLocalConfig.define.cliSpace });
            CommonUtil.utilsHelper.spawn("npm", ["start"], { cwd: oLocalConfig.appReact.workPath });
        }
    };
    return MinitConfig;
}());
module.exports = new MinitConfig();
