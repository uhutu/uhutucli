import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import DefineConfig = require("../../cli/default-define/define_config");
import DefineEnv = require("../../cli/default-define/define_env");

import LoadConfig = require("../../cli/exec-load/load_config");


import initInstall=require("../../cli/exec-init/init_install");


let oLocalConfig = null;

/**
 * 测试用例加载的脚本文件
 * 
 * @class McommandTest
 */
class McommandTest {


    constructor() {

        let oEnv = DefineEnv.upEnv();

        oEnv.pathCwd = "./test/testdemo";
        oEnv.pathCli = ".";


        oLocalConfig = LoadConfig.upConfig(oEnv);


    }


    upTestConfig() {
        return oLocalConfig;
    }



}


export =new McommandTest();