import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";


class MinitConfig {

    initStart(oLocalConfig: AimLocal.IAimLocalConfig) {

        if (!CommonUtil.utilsString.isEmpty(oLocalConfig.env.argsBuild)) {



            if (CommonRoot.upProperty().defaultName === oLocalConfig.env.argsBuild || oLocalConfig.env.argsBuild === 'gulp') {

                CommonUtil.utilsHelper.spawn("./node_modules/.bin/gulp", ["--diskconfig=" + oLocalConfig.file.diskConfigFile], { cwd: oLocalConfig.define.cliSpace });
            }


            if (CommonRoot.upProperty().defaultName === oLocalConfig.env.argsBuild || oLocalConfig.env.argsBuild === 'react') {

                CommonUtil.utilsHelper.spawn("npm", ["start"], { cwd: oLocalConfig.appReact.workPath });
            }







        }






    }


}


export =new MinitConfig();