
import * as AimLocal from "../../cli/aim-top/aim_local";
import CommonRoot = require("../../base/common/root");

import InitConfig = require("../../cli/exec-init/init_config");
import InitInstall = require("../../cli/exec-init/init_install");
import LoadConfig = require("../../cli/exec-load/load_config");

import UtilsIo = require("../../base/utils/io");

class MstartBase implements AimLocal.IAimLocalInit {

    initStart(oEnv: AimLocal.IAimLocalNexusEnv) {

        this._initSystem(oEnv);

        CommonRoot.logInfo(962001001);


        this._initFormatEnv(oEnv);


        CommonRoot.logDebug(972001001, JSON.stringify(oEnv));

        //判断如果是初始化配置文件
        if (oEnv.argsConfig) {
            InitConfig.initStart(oEnv);
        } else {

            //判断是否存在配置文件  如果不存在则报错
            if (InitConfig.flagExistConfig(oEnv)) {


                let localConfig = LoadConfig.upConfig(oEnv);


                if (oEnv.argsInstall) {
                    InitInstall.initStart(localConfig);
                }



            } else {

                CommonRoot.logError(932001001);
            }


        }


        CommonRoot.logInfo(962001002);

    }


    _initSystem(oEnv: AimLocal.IAimLocalNexusEnv) {

        if(oEnv.argsLog){

            CommonRoot.setLogLevel(oEnv.argsLog);
        }


    }



    /**
     * 本地重新初始化格式变量
     * @param envs 
     */
    _initFormatEnv(oEnv: AimLocal.IAimLocalNexusEnv) {

        oEnv.pathCli = UtilsIo.parentPath(oEnv.pathStart);


    }




}


export =new MstartBase();

