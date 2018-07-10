"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var MinitConfig = /** @class */ (function () {
    function MinitConfig() {
    }
    MinitConfig.prototype.initStart = function (oLocalConfig) {
        if (!CommonUtil.utilsString.isEmpty(oLocalConfig.env.argsBuild)) {
            if (CommonRoot.upProperty().defaultName === oLocalConfig.env.argsBuild || oLocalConfig.env.argsBuild === 'gulp') {
                CommonUtil.utilsHelper.spawn("./node_modules/.bin/gulp", ["--diskconfig=" + oLocalConfig.file.diskConfigFile], { cwd: oLocalConfig.define.cliSpace });
            }
            if (CommonRoot.upProperty().defaultName === oLocalConfig.env.argsBuild || oLocalConfig.env.argsBuild === 'react') {
                CommonUtil.utilsHelper.spawn("npm", ["start"], { cwd: oLocalConfig.appReact.workPath });
            }
        }
    };
    return MinitConfig;
}());
module.exports = new MinitConfig();
