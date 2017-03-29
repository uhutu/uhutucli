

import UtilsIo = require("../../base/utils/io");

import * as AimLocal from "../../cli/aim-top/aim_local";

import ModuleInstall = require("../../cli/module-react/module_install");

class MinitInstall {

    initStart(oLocalConfig: AimLocal.IAimLocalConfig) {



        ModuleInstall.installProject(oLocalConfig);


    }


}


export =new MinitInstall();