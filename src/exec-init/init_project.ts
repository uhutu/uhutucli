

import utils_io = require("../utils/io");
import init_project = require("../exec-init/init_project");

import * as AimLocal from "../aim-top/aim_local";


class InitProject implements AimLocal.IInitProject {


    initStart(envs: AimLocal.MAimLocalEnv) {

        if(!this.flagExistConfig(envs)){

            utils_io.copyFileAsync(this._upSourceFile,this._upTargetFile);
        }


    }

    _upSourceFile(envs: AimLocal.MAimLocalEnv){
        return utils_io.pathJoin(envs.pathCli,envs.dirTemplateInit,envs.fileConfig );
    }

    _upTargetFile(envs: AimLocal.MAimLocalEnv){
        return utils_io.pathJoin(envs.pathCwd,envs.fileConfig);
    }


    flagExistConfig(envs: AimLocal.MAimLocalEnv){

        return utils_io.flagExist(this._upTargetFile(envs));

    }

}


export =new InitProject();