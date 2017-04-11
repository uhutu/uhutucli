import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import * as AimParse from "../../project/aim-project/aim_parse";

import ParseSupport = require("../../project/support-operate/parse_support");

import ReactParse = require("../../project/process-app/react_parse");

import VueParse = require("../../project/process-app/vue_parse");


import WeappParse = require("../../project/process-app/weapp_parse");


import ejs = require("ejs");

class Mexport {


    contentParse(oLocalConfig: AimLocal.IAimLocalConfig, oParseFile: AimParse.MprocessParseFile): string {

        let sReturn = null;
        let oOutContent: AimParse.MtransformPageOut = null;

        let oTrans: AimParse.ItransformParse = null;

        let oApp: AimLocal.IAimLocalNexusApp = null;

        if (oParseFile.parseType === "react") {
            oTrans = ReactParse;
            oApp = oLocalConfig.appReact;

        } else if (oParseFile.parseType === "vue") {
            oTrans = VueParse;
            oApp = oLocalConfig.appVue;

        } else if (oParseFile.parseType === "weapp") {
            oTrans = WeappParse;
            oApp = oLocalConfig.appWeapp;

        }

        oTrans.mould = CommonUtil.utilsJson.parse(CommonUtil.utilsIo.readFile(oApp.mouldPath));
        oTrans.pageConfig.masterPath = oLocalConfig.define.devPath + "/master/" + oApp.appType;



        oOutContent = ParseSupport.parseHtml(oLocalConfig, oTrans, oParseFile);


        if (oOutContent != null) {

            //如果输出的页面配置不存在  则加载默认配置项
            if (!oOutContent.pageConfig) {
                oOutContent.pageConfig = oTrans.pageConfig;
            }





            var sTemplate = CommonUtil.utilsIo.readFile(CommonUtil.utilsIo.pathJoin(oOutContent.pageConfig.masterPath, oOutContent.pageConfig.tplFile));



            var sOut = ejs.render(sTemplate, {out:oOutContent});

            sReturn = sOut;

        } else {
            CommonRoot.logError(931612001, [oParseFile.parseType, oParseFile.fileBasename]);
        }




        return sReturn;
    }

}

export =new Mexport();