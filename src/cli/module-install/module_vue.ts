

import * as AimLocal from "../../cli/aim-top/aim_local";

import CommonRoot = require("../../base/common/root");

import CommonUtil = require("../../base/common/util");

import LoadPlug = require("../../cli/exec-load/load_plug");


class MmoduleVue {


    installProject(oLocalConfig: AimLocal.IAimLocalConfig) {

        oLocalConfig.plugVue = LoadPlug.refreshPlug(oLocalConfig, oLocalConfig.appVue, oLocalConfig.plugVue);
        this.checkWork(oLocalConfig);



        LoadPlug.processPlus(oLocalConfig, oLocalConfig.plugVue, ["all"]);



    }

    /**
     * 判断应用是否存在 
     * @param oLocalConfig 
     */
    checkWork(oLocalConfig: AimLocal.IAimLocalConfig) {

    }







}

export =new MmoduleVue();