import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";


class MinitConfig {

    initStart(oLocalConfig: AimLocal.IAimLocalConfig) {


        if (!CommonUtil.utilsString.isEmpty(oLocalConfig.env.argsBuild)) {





            CommonUtil.utilsHelper.spawn("./node_modules/gulp/bin/gulp.js", ["--diskconfig=" + oLocalConfig.file.diskConfigFile], { cwd: oLocalConfig.define.cliSpace });



            if (CommonUtil.utilsString.contains(oLocalConfig.env.argsBuild, 'start')) {
                CommonUtil.utilsHelper.spawn("npm", ["start"], { cwd: oLocalConfig.appReact.workPath });
            }




        }






    }


}


export =new MinitConfig();