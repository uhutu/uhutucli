
import * as AimLocal from "../../cli/aim-top/aim_local";
import CommonRoot = require("../../base/common/root");

import InitConfig = require("../../cli/exec-init/init_config");
import InitInstall = require("../../cli/exec-init/init_install");
import LoadConfig = require("../../cli/exec-load/load_config");

import UtilsIo = require("../../base/utils/io");

class MstartBase implements AimLocal.IAimLocalInit {

    initStart(envs: AimLocal.IAimLocalEnv) {

        this._initFormatEnv(envs);


        CommonRoot.logDebug(972001001, JSON.stringify(envs));

        //判断如果是初始化配置文件
        if (envs.argsConfig) {
            InitConfig.initStart(envs);
        } else {

            //判断是否存在配置文件  如果不存在则报错
            if (InitConfig.flagExistConfig(envs)) {


                let localConfig = LoadConfig.upConfig(envs);


                if (envs.argsInstall) {
                    InitInstall.initStart(localConfig);
                }



            } else {

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

