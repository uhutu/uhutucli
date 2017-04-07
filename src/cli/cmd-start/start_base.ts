
import * as AimLocal from "../../cli/aim-top/aim_local";
import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import InitConfig = require("../../cli/exec-init/init_config");
import InitInstall = require("../../cli/exec-init/init_install");
import InitBuild= require("../../cli/exec-init/init_build");

import LoadConfig = require("../../cli/exec-load/load_config");


class MstartBase implements AimLocal.IAimLocalInit {

    initStart(oEnv: AimLocal.IAimLocalNexusEnv) {

        this._initSystem(oEnv);

        CommonRoot.logInfo(960312001);

        
        this._initFormatEnv(oEnv);


        CommonRoot.logDebug(970312001, JSON.stringify(oEnv));

         let localConfig:AimLocal.IAimLocalConfig=null;

        //判断如果是初始化配置文件
        if (oEnv.argsConfig) {
            InitConfig.initStart(oEnv);
        } else {

            //判断是否存在配置文件  如果不存在则报错
            if (InitConfig.flagExistConfig(oEnv)) {


                 localConfig = LoadConfig.upConfig(oEnv);


                if (oEnv.argsInstall) {
                    InitInstall.initStart(localConfig);
                }


                if (oEnv.argsBuild) {
                    InitBuild.initStart(localConfig);
                }



            } else {

                CommonRoot.logError(930312001);
            }


        }
        if(localConfig!=null){
            LoadConfig.saveConfigInfo(localConfig);
        }
        
        CommonRoot.logInfo(960312002);

    }


    /**
     * 初始化代码
     * 
     * @param {AimLocal.IAimLocalNexusEnv} oEnv 
     * 
     * @memberOf MstartBase
     */
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

        oEnv.pathCli = CommonUtil.utilsIo.parentTop(oEnv.pathStart,3);


    }




}


export =new MstartBase();

