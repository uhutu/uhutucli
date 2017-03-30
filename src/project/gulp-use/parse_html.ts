import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import * as AimParse from "../../project/aim-project/aim_parse";

import ParseSupport = require("../../project/support-operate/parse_support");

import ReactParse = require("../../project/process-react/react_parse");

class Mexport {


    contentParse(oLocalConfig: AimLocal.IAimLocalConfig, oParseFile: AimParse.MprocessParseFile): string {

        let sReturn = null;
        let oOutContent: AimParse.MtransformPageOut = null;
        if (oParseFile.parseType === "react") {

            oOutContent = ParseSupport.parseHtml(oLocalConfig, ReactParse);

        }

        if (oOutContent != null) {

            sReturn = oOutContent.content.join('');

        } else {
            CommonRoot.logError(931612001, oParseFile.parseType, oParseFile.fileBasename);
        }




        return sReturn;
    }

}

export =new Mexport();