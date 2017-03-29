
import * as AimLocal from "../../cli/aim-top/aim_local";
import CommonRoot =require("../../base/common/root");

import InitProject =require("../../cli/exec-init/init_project");
import UtilsIo = require("../../base/utils/io");

class MstartBase implements AimLocal.IAimLocalInit {

    initStart(envs: AimLocal.IAimLocalEnv) {

        this._initFormatEnv(envs);

        
        CommonRoot.logDebug(972001001,JSON.stringify(envs));

        if (envs.argsInit) {
            InitProject.initStart(envs);
        } else {

            if(InitProject.flagExistConfig(envs)){

                
            }else{

                CommonRoot.logError(932001001);
            }


        }

    }


    /**
     * 本地重新初始化格式变量
     * @param envs 
     */
    _initFormatEnv(envs: AimLocal.IAimLocalEnv) {

        envs.pathCli = UtilsIo.parentPath(envs.pathStart);


    }




}


export =new MstartBase();

