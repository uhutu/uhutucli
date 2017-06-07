import CommonRoot = require("../../base/common/root");



import * as AimLocal from "../../cli/aim-top/aim_local";

import ModuleReact = require("../../cli/module-install/module_react");
import ModuleVue = require("../../cli/module-install/module_vue");

class MinitInstall {

    initStart(oLocalConfig: AimLocal.IAimLocalConfig) {


        if (!oLocalConfig.appReact.disable) {
            CommonRoot.logDebug(970312007, oLocalConfig.appReact.appType);
            ModuleReact.installProject(oLocalConfig);
        }
        if (!oLocalConfig.appVue.disable) {
            CommonRoot.logDebug(970312007, oLocalConfig.appVue.appType);
            ModuleVue.installProject(oLocalConfig);
        }

    }


}


export =new MinitInstall();