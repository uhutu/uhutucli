import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import * as CTF from "../../project/aim-project/aim_parse";


import processItem = require("../../project/support-operate/item_support");


class CappElms implements CTF.ItransformElmentProcess {

    upProcess(oTransform: CTF.ItransformParse, oItem: CTF.ItransformItemInfo) {



        return new CTF.MtransformParseHelper().upBaseElm(oTransform, oItem);
    }

}



class CappSub implements CTF.ItransformSubExtend {

    static styleParse(sClassStyle) {

        var aStyle = [];

        sClassStyle.split(' ').forEach(
            function (f) {
                aStyle.push("styles." + f);
            }
        );
        return "[" + aStyle.join(',') + "]";

    }

    attrParse(oItem: CTF.ItransformItemInfo) {
        oItem.sourceAttr.forEach(function (value, key) {
            if (key === "class") {
                oItem.targetAttr.set("style", CappSub.styleParse(oItem.sourceAttr.get("class")));

                //oItem.elmProcess.styleName.push(value);

            }

            processItem.checkEventFull(oItem, "press", "onPress", "()=>{", "}");

            processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");

            processItem.checkEventFull(oItem, "value-change", "onValueChange", "(value)=>{", "}");

            processItem.checkEventFull(oItem, "link", "onPress", "()=>{", "}");


            processItem.checkStateFull(oItem, "value", "value", "", "");


        });
        return oItem;



    }
}

class CappOut implements CTF.ItransFormatOut {

    contentFormat(oOut: CTF.MtransformPageOut) {


        for (var i = 0, j = oOut.content.length; i < j; i++) {

            oOut.content[i] = this.forReplace(oOut.content[i]);

        }

        return oOut;
    }


    forReplace(sStr: string) {
        var sReturn = sStr;

        if (sStr.indexOf(CommonRoot.upProperty().regexOutBegin) > -1) {


            var reg = new RegExp("\\" + CommonRoot.upProperty().regexOutBegin + CommonRoot.upProperty().regexBaseString + "\\" + CommonRoot.upProperty().regexOutEnd, "g");

            let r = [];
            while (r = reg.exec(sStr)) {
                var sReplace = r[0];
                switch (r[1]) {
                    case "state":
                        sReplace = '{this.state.' + r[2] + '}';
                        break;
                    default:
                        break;
                }
                sReturn = sReturn.replace(r[0], sReplace);
            }

            //这里hack一个bug 属性已经加了双引号
            sReturn = sReturn.replace("{{", "{").replace("}}", "}");

        }
        return sReturn;

    }



}

class Mexport implements CTF.ItransformParse {
    elms = new CappElms();
    inc = {
        attr_replace: " {key}={{value}} "
    }
    parses = new CappSub();

    mould

    pageConfig = new CTF.MbasePageConfig();

    outFormat = new CappOut();


}

export =new Mexport();