

import UtilsIo = require("../../base/utils/io");

import * as AimLocal from "../../cli/aim-top/aim_local";


class MinitProject implements AimLocal.IInitProject {

    initStart(envs: AimLocal.IAimLocalEnv) {
        if(!this.flagExistConfig(envs)){
            UtilsIo.copyFileAsync(this._upSourceFile(envs),this._upTargetFile(envs));
        }
    }

    _upSourceFile(envs: AimLocal.IAimLocalEnv){
        return UtilsIo.pathJoin(envs.pathCli,envs.dirTemplateInit,envs.fileConfig );
    }

    _upTargetFile(envs: AimLocal.IAimLocalEnv){
        return UtilsIo.pathJoin(envs.pathCwd,envs.fileConfig);
    }


    flagExistConfig(envs: AimLocal.IAimLocalEnv){

        return UtilsIo.flagExist(this._upTargetFile(envs));

    }

}


export =new MinitProject();