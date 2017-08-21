import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
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
                //判断如果有点 则是特殊定义操作
                if (f.indexOf('.') > -1) {
                    aStyle.push(f);
                }
                else {
                    aStyle.push( f);
                }

            }
        );
        
        return aStyle.length > 1 ? (aStyle.join(' ')) : aStyle[0];

    }

    formNameParse(sName:string)
    {
        return ""+sName+"";
    }

    attrParse(oItem: CTF.ItransformItemInfo) {


        oItem.sourceAttr.forEach(function (value, key) {
            
            if (key === "class") {
                
                
                oItem.targetAttr.set("class", "\"" + oItem.sourceAttr.get("class")  + "\"");

                

            }
        });


        processItem.VueEventAuto(oItem);

        return oItem;
    }
}


class CappOut implements CTF.ItransFormatOut {

    contentFormat(oOut: CTF.MtransformPageOut) {

        for (var i = 0, j = oOut.templateInfos.length; i < j; i++) {

            oOut.content[i] = this.forReplace(oOut.content[i]);

            for (var n = 0, m = oOut.templateInfos[i].templateContent.length; n < m; n++) {
                oOut.templateInfos[i].templateContent[n] = this.forReplace(oOut.templateInfos[i].templateContent[n]);
            }

        }


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
                    //state变量
                    case "state":
                        sReplace = '{this.state.' + r[2] + '}';
                        break;
                    case "item":
                        sReplace = '{{item.' + r[2] + '}}';
                        break;
                    //变量替换
                    case "env":
                        sReplace = '{{' + r[2] + '}}';
                        break;
                    //直接输出
                    case "tag":
                        sReplace = '' + r[2] + '';
                        break;
                    //指向this
                    case "this":
                        sReplace = CommonUtil.utilsString.isEmpty(r[2]) ? 'this' : 'this.' + r[2] + '';
                        break;
                    case "item-param":
                        sReplace = 'item.' + r[2] + '';
                        break;
                    default:
                        break;
                }
                sReturn = sReturn.replace(r[0], sReplace);
            }

            //这里hack一个bug 属性已经加了双引号
            //sReturn = sReturn.replace("{{", "{").replace("}}", "}");

        }
        return sReturn;

    }


}

class MappParse implements CTF.ItransformParse {
    elms = new CappElms();
    inc = {
        attr_replace: " {key}={value} "
    }
    parses = new CappSub();
    mould
    pageConfig = new CTF.MbasePageConfig();

    outFormat = new CappOut();
}




export =new MappParse();