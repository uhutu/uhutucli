

import UtilsIo = require("../../base/utils/io");

import * as AimLocal from "../../cli/aim-top/aim_local";


class MinitConfig implements AimLocal.IInitProject {

    initStart(envs: AimLocal.IAimLocalNexusEnv) {
        if(!this.flagExistConfig(envs)){
            UtilsIo.copyFileAsync(this._upSourceFile(envs),this._upTargetFile(envs));
        }
    }

    _upSourceFile(envs: AimLocal.IAimLocalNexusEnv){
        return UtilsIo.pathJoin(envs.pathCli,envs.dirTemplateInit,envs.fileConfig );
    }

    _upTargetFile(envs: AimLocal.IAimLocalNexusEnv){
        return UtilsIo.pathJoin(envs.pathCwd,envs.fileConfig);
    }


    flagExistConfig(envs: AimLocal.IAimLocalNexusEnv){

        return UtilsIo.flagExist(this._upTargetFile(envs));

    }

}


export =new MinitConfig();