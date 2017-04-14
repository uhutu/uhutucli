import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";


class MinitConfig implements AimLocal.IInitProject {

    /**
     * 初始化一个配置文件
     * 
     * @param {AimLocal.IAimLocalNexusEnv} envs 
     * 
     * @memberOf MinitConfig
     */
    initStart(envs: AimLocal.IAimLocalNexusEnv) {
        if(!this.flagExistConfig(envs)){
            CommonUtil.utilsIo.copyFileAsync(this._upSourceFile(envs),this._upTargetFile(envs));
        }
        else{
            CommonRoot.logError(930312004);
        }
    }

    _upSourceFile(envs: AimLocal.IAimLocalNexusEnv){
        return CommonUtil.utilsIo.pathJoin(envs.pathCli,envs.dirTemplateInit,envs.fileConfig );
    }

    _upTargetFile(envs: AimLocal.IAimLocalNexusEnv){
        return CommonUtil.utilsIo.pathJoin(envs.pathCwd,envs.fileConfig);
    }

   /**
    * 判断是否存在配置文件
    * 
    * @param {AimLocal.IAimLocalNexusEnv} envs 
    * @returns {boolean} 
    * 
    * @memberOf MinitConfig
    */
    flagExistConfig(envs: AimLocal.IAimLocalNexusEnv):boolean{

        return CommonUtil.utilsIo.flagExist(this._upTargetFile(envs));

    }

}


export =new MinitConfig();