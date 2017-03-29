import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";


class MinitConfig {

    initStart(oLocalConfig: AimLocal.IAimLocalConfig) {
        
        

        CommonUtil.utilsHelper.spawnSync("./node_modules/gulp/bin/gulp.js", ["--diskconfig="+oLocalConfig.file.diskConfigFile], { cwd: oLocalConfig.define.cliSpace });


    }

    
}


export =new MinitConfig();