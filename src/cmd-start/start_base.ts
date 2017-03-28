
import * as AimLocal from "../aim-top/aim_local";

import init_project = require("../exec-init/init_project");

class StartBase implements AimLocal.IAimLocalInit {



    initStart(envs: AimLocal.MAimLocalEnv) {

        this._initFormatEnv(envs);

        console.log(envs);

        if (envs.argsInit) {
            init_project.initStart(envs);
        }

    }


    /**
     * 本地重新初始化格式变量
     * @param envs 
     */
    _initFormatEnv(envs: AimLocal.MAimLocalEnv){



    }




}


export =new StartBase();

