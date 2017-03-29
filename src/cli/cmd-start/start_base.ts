
import * as AimLocal from "../aim-top/aim_local";

import init_project = require("../exec-init/init_project");
import utils_io = require("../utils/io");

class StartBase implements AimLocal.IAimLocalInit {



    initStart(envs: AimLocal.MAimLocalEnv) {

        this._initFormatEnv(envs);

        console.log(envs);

        if (envs.argsInit) {
            init_project.initStart(envs);
        } else {




        }

    }


    /**
     * 本地重新初始化格式变量
     * @param envs 
     */
    _initFormatEnv(envs: AimLocal.MAimLocalEnv) {

        envs.pathCli = utils_io.parentPath(envs.pathStart);


    }




}


export =new StartBase();

