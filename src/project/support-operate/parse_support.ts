import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import * as AimParse from "../../project/aim-project/aim_parse";

import htmlparser = require("htmlparser2");


class CitemParse implements AimParse.ItransformItemInfo {

    elmType: number = 0
    elmName: string = ""
    elmentInfo: AimParse.ItransformElmentInfo = null

    sourceName: string = ""
    sourceContent: string = ""
    sourceAttr: Map<string, string> = new Map<string, string>()

    targetAttr: Map<string, string> = new Map<string, string>()
    transSub: AimParse.ItransformSubExtend = null





};







class ChelperParse {

    upElmParse(sName: string, oTransform: AimParse.ItransformParse, oAttr): CitemParse {
        var oElm = new CitemParse();

        //初始化元素对象
        oElm.sourceName = sName;
        var mAttrMap = CommonUtil.utilsMap.initMap(oAttr);
        oElm.sourceAttr = mAttrMap;



        if (sName === "script") {
            if (oElm.sourceAttr.has("type")) {
                let sType = oElm.sourceAttr.get("type");
                if (sType === "text/u-template") {
                    oElm.elmType = 2;
                } else if (sType === "text/u-config") {
                    oElm.elmType = 3;
                }
            }
        } else if (sName === "style") {
            oElm.elmType = 0;
        } else {

            let oProcess: AimParse.ItransformElmentInfo = oTransform.elms.upProcess(oTransform, oElm);
            if (oProcess != null) {
                oElm.elmType = 1;
                oElm.elmentInfo = oProcess;
                oElm.transSub = oTransform.parses;
            }


        }

        if (oElm.elmentInfo != null) {
            oElm.elmName = oElm.elmentInfo.tagName;
            this.upPrimeAttr(oElm);
        }
        this.upStyleRecheck(oElm);

        return oElm;
    }


    upPrimeAttr(oElm: AimParse.ItransformItemInfo) {
        if (oElm.elmentInfo.hasOwnProperty('primeAttr')) {

            oElm.elmentInfo.primeAttr = CommonUtil.utilsMap.formatMapbyObject(oElm.elmentInfo, "primeAttr");

            oElm.elmentInfo.primeAttr.forEach(
                function (v, k) {
                    oElm.targetAttr.set(k, v);
                }
            );


        }
    }



    //重新合并处理样式class
    upStyleRecheck(oElm: AimParse.ItransformItemInfo) {

        var sReturn = "";
        if (oElm.sourceAttr.has('class')) {
            sReturn = oElm.sourceAttr.get("class");
        }
        if (oElm.elmType == 1) {
            if (oElm.elmentInfo != null && oElm.elmentInfo.styleName != undefined && oElm.elmentInfo.styleName.length > 0) {
                sReturn = oElm.elmentInfo.styleName.join(' ') + " " + sReturn;
            }

        }

        if (!CommonUtil.utilsString.isEmpty(sReturn)) {

            var aNew = [];
            sReturn.split(" ").forEach(
                function (f) {
                    if (!CommonUtil.utilsString.isEmpty(f)) {
                        aNew.push(f);
                    }
                }
            );
            sReturn = aNew.join(' ');
            oElm.sourceAttr.set("class", sReturn);
        }

        return sReturn;

    }




}

const helperParse = new ChelperParse();




class Mexport {

    /**
     * 转换处理方法 该方法调用htmlparse2的处理逻辑 将文本内容转换到对应的内容
     * @param oLocalConfig 
     * @param oParseWork 
     * @param oParseFile 
     */
    parseHtml(oLocalConfig: AimLocal.IAimLocalConfig, oTransform: AimParse.ItransformParse, oParseFile: AimParse.MprocessParseFile): AimParse.MtransformPageOut {


        let oOut = new AimParse.MtransformPageOut();

        oOut.sourceFile = oParseFile;

        //元素组 将元素push或者pop来判断出当前元素的内容
        let aElmArray: AimParse.ItransformItemInfo[] = [];

        //定义本轮循环元素中间的字符串
        let aTextContent: string[] = [];

        let sFormName = '';

        //定义转换函数对象
        var parser = new htmlparser.Parser({
            onopentag: function (sName: string, oAttr) {

                let oItem: AimParse.ItransformItemInfo = helperParse.upElmParse(sName, oTransform, oAttr);
                //判断元素名是否为空
                if (!CommonUtil.utilsString.isEmpty(oItem.elmName)) {

                    if (oItem.transSub != null) {
                        //属性转换处理
                        oItem.transSub.attrParse(oItem);


                    }

                }


                //如果是基本元素  则添加结束标记
                if (oItem.elmType == 1) {

                    if (!CommonUtil.utilsString.isEmpty(oItem.elmentInfo.expandFile)) {

                        var oExpand: AimParse.ItransformExpandItem = require(oItem.elmentInfo.expandFile);

                        oItem = oExpand.expandOpen(oItem, oOut);

                    }


                    //form的处理逻辑
                    if (oItem.sourceName === CommonRoot.upProperty().formElementName) {
                        if (oItem.sourceAttr.has(CommonRoot.upProperty().formBaseAttr)) {
                            sFormName = oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr);
                            oItem.targetAttr.set(CommonRoot.upProperty().formBaseAttr, oTransform.parses.formNameParse(sFormName));


                        }
                        else {
                            CommonRoot.logWarn(941612001, oParseFile.fileBasename);
                        }
                    }
                    else if (!CommonUtil.utilsString.isEmpty(sFormName)) {
                        if (oItem.sourceAttr.has(CommonRoot.upProperty().formBaseAttr)) {
                            oItem.targetAttr.set(CommonRoot.upProperty().formBaseAttr, oTransform.parses.formNameParse(sFormName + CommonRoot.upProperty().formNameSplit + oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr)));
                        }
                    }



                    oOut.content.push('<' + oItem.elmName);
                    //循环生成的目标属性
                    oItem.targetAttr.forEach(
                        function (v, k) {
                            oOut.content.push(
                                CommonUtil.utilsString.formatString(oTransform.inc.attr_replace, { key: k, value: v })
                            );
                        }
                    )
                    oOut.content.push('>');


                }

                //初始化内容数组
                aTextContent = [];
                aElmArray.push(oItem);
            },
            ontext: function (sText) {
                //内容数据添加进去
                aTextContent.push(sText);
            },
            onclosetag: function (sName) {
                let oItem = aElmArray[aElmArray.length - 1];
                //判断如果是模板 则递归调用自己进行输出
                if (oItem.elmType == 2) {
                    var oNewParse: AimParse.MprocessParseFile = Object.assign(oParseFile);
                    oNewParse.fileContent = aTextContent.join('');

                    var oTextOut = new Mexport().parseHtml(oLocalConfig, oTransform, oNewParse);

                }
                //判断如果是配置数据
                else if (oItem.elmType === 3) {

                    var sJson = aTextContent.join('');
                    oOut.pageConfig = CommonUtil.utilsHelper.deepAssign(oTransform.pageConfig, CommonUtil.utilsJson.parse(sJson));

                } else if (oItem.elmType == 1) {

                    oItem.sourceContent = aTextContent.join('');
                }
                //如果是基本元素  则添加结束标记
                if (oItem.elmType == 1) {


                    if (oItem.sourceName === CommonRoot.upProperty().formElementName) {
                        sFormName = '';

                    }

                    oOut.content.push(oItem.sourceContent);
                    oOut.content.push('</' + oItem.elmName);
                    oOut.content.push('>');
                }
                aTextContent = [];
                aElmArray.pop();
            }

        }, {
                decodeEntities: true
            });
        //转换处理文件内容
        parser.write(oParseFile.fileContent);
        parser.end();


        oTransform.outFormat.contentFormat(oOut);


        return oOut;
    }

}

export =new Mexport();