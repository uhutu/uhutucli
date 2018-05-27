"use strict";
var DefineEnv = require("../../cli/default-define/define_env");
var start_base = require("../../cli/cmd-start/start_base");
var oLocalConfig = null;
/**
 * 测试用例加载的脚本文件
 *
 * @class McommandTest
 */
var McommandTest = /** @class */ (function () {
    function McommandTest() {
        var oEnv = DefineEnv.upEnv();
        oEnv.pathCwd = "./test/testdemo";
        //oEnv.pathCli = ".";
        oEnv.pathStart = __dirname;
        console.log(oEnv);
        oEnv.argsConfig = true;
        oEnv.argsInstall = true;
        start_base.initStart(oEnv);
    }
    McommandTest.prototype.upTestConfig = function () {
        return oLocalConfig;
    };
    return McommandTest;
}());
module.exports = new McommandTest();
