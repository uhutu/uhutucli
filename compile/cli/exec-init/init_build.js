"use strict";
var CommonUtil = require("../../base/common/util");
var MinitConfig = (function () {
    function MinitConfig() {
    }
    MinitConfig.prototype.initStart = function (oLocalConfig) {
        CommonUtil.utilsHelper.spawnSync("./node_modules/gulp/bin/gulp.js", ["--diskconfig=" + oLocalConfig.file.diskConfigFile], { cwd: oLocalConfig.define.cliSpace });
    };
    return MinitConfig;
}());
module.exports = new MinitConfig();
