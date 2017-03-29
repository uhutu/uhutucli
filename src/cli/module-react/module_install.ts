

import * as AimLocal from "../../cli/aim-top/aim_local";
import UtilsHelper = require("../../base/utils/helper");
import UtilsIo = require("../../base/utils/io");
import CommonRoot = require("../../base/common/root");

class MmoduleInstall {


    installProject(oLocalConfig: AimLocal.IAimLocalConfig) {


        if (!UtilsIo.flagExist(oLocalConfig.appReact.workName)) {
            UtilsHelper.spawnSync("react-native", ["init", oLocalConfig.appReact.workName], { cwd: oLocalConfig.env.pathCwd });
        }
        else{
            CommonRoot.logDebug(972001003,oLocalConfig.appReact.workName);
        }



    }


}

export =new MmoduleInstall();