

import utils_io = require("../utils/io");
import init_project = require("../exec-init/init_project");

import * as AimLocal from "../aim-top/aim_local";


class InitProject implements AimLocal.IAimLocalInit {


    initStart(envs: AimLocal.MAimLocalEnv) {


        let sourceFile=utils_io.pathJoin(envs.pathCli,envs.dirTemplateInit,envs.fileConfig );

        let sTargetFile=utils_io.pathJoin(envs.pathCwd,envs.fileConfig);

        if(!utils_io.flagExist(sTargetFile)){
            utils_io.copyFileAsync(sourceFile,sTargetFile);
        }


    }

}


export =new InitProject();