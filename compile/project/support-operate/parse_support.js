"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var AimParse = require("../../project/aim-project/aim_parse");
var htmlparser = require("htmlparser2");
var CitemParse = (function () {
    function CitemParse() {
        this.elmType = 0;
        this.elmName = "";
        this.elmentInfo = null;
        this.sourceName = "";
        this.sourceContent = "";
        this.sourceAttr = new Map();
        this.targetAttr = new Map();
        this.transSub = null;
    }
    return CitemParse;
}());
;
var ChelperParse = (function () {
    function ChelperParse() {
    }
    ChelperParse.prototype.upElmParse = function (sName, oTransform, oAttr) {
        var oElm = new CitemParse();
        //初始化元素对象
        oElm.sourceName = sName;
        var mAttrMap = CommonUtil.utilsMap.initMap(oAttr);
        oElm.sourceAttr = mAttrMap;
        if (sName === "script") {
            oElm.elmType = 5;
            if (oElm.sourceAttr.has("type")) {
                var sType = oElm.sourceAttr.get("type");
                if (sType === "text/u-template") {
                    oElm.elmType = 2;
                }
                else if (sType === "text/u-config") {
                    oElm.elmType = 3;
                }
            }
        }
        else if (sName === CommonRoot.upProperty().pageElementMacro) {
            oElm.elmType = 4;
        }
        else if (sName === "style") {
            oElm.elmType = 0;
        }
        else {
            var oProcess = oTransform.elms.upProcess(oTransform, oElm);
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
    };
    ChelperParse.prototype.upPrimeAttr = function (oElm) {
        if (oElm.elmentInfo.hasOwnProperty('primeAttr')) {
            oElm.elmentInfo.primeAttr = CommonUtil.utilsMap.formatMapbyObject(oElm.elmentInfo, "primeAttr");
            oElm.elmentInfo.primeAttr.forEach(function (v, k) {
                oElm.targetAttr.set(k, v);
            });
        }
    };
    //重新合并处理样式class
    ChelperParse.prototype.upStyleRecheck = function (oElm) {
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
            sReturn.split(" ").forEach(function (f) {
                if (!CommonUtil.utilsString.isEmpty(f)) {
                    aNew.push(f);
                }
            });
            sReturn = aNew.join(' ');
            oElm.sourceAttr.set("class", sReturn);
        }
        return sReturn;
    };
    return ChelperParse;
}());
var helperParse = new ChelperParse();
var Mexport = (function () {
    function Mexport() {
    }
    /**
     * 转换处理方法 该方法调用htmlparse2的处理逻辑 将文本内容转换到对应的内容
     * @param oLocalConfig
     * @param oParseWork
     * @param oParseFile
     */
    Mexport.prototype.parseHtml = function (oLocalConfig, oTransform, oParseFile) {
        var oOut = new AimParse.MtransformPageOut();
        oOut.sourceFile = oParseFile;
        var oCurrentParse = new AimParse.MtransformCurrentParse();
        var oPageProperty = new AimParse.MtransformPageProperty();
        var oTemplateInfo = null;
        //定义转换函数对象
        var parser = new htmlparser.Parser({
            onopentag: function (sName, oAttr) {
                var oItem = helperParse.upElmParse(sName, oTransform, oAttr);
                //判断元素名是否为空
                if (!CommonUtil.utilsString.isEmpty(oItem.elmName)) {
                    if (oItem.transSub != null) {
                        //属性转换处理
                        oItem.transSub.attrParse(oItem);
                    }
                }
                if (oItem.elmType == 4) {
                    if (oItem.sourceAttr.has(CommonRoot.upProperty().formBaseAttr)) {
                        oCurrentParse.templateName = oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr);
                        oItem.targetAttr.set(CommonRoot.upProperty().formBaseAttr, oTransform.parses.formNameParse(oCurrentParse.formName));
                        oTemplateInfo = new AimParse.MtransformTemplateInfo();
                        oTemplateInfo.templateName = oCurrentParse.templateName;
                        if (oItem.sourceAttr.has(CommonRoot.upProperty().dataAttrXary + CommonRoot.upProperty().templateSourceName)) {
                            oTemplateInfo.templateSource = oItem.sourceAttr.get(CommonRoot.upProperty().dataAttrXary + CommonRoot.upProperty().templateSourceName);
                        }
                    }
                    else {
                        CommonRoot.logWarn(941612001, oParseFile.fileBasename);
                    }
                }
                //如果是基本元素  则添加结束标记
                if (oItem.elmType == 1) {
                    if (!CommonUtil.utilsString.isEmpty(oItem.elmentInfo.expandFile)) {
                        var oExpand = require(oItem.elmentInfo.expandFile);
                        oItem = oExpand.expandOpen(oItem, oOut);
                    }
                    //form的处理逻辑
                    if (oItem.sourceName === CommonRoot.upProperty().pageElmentForm) {
                        if (oItem.sourceAttr.has(CommonRoot.upProperty().formBaseAttr)) {
                            oCurrentParse.formName = oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr);
                            oItem.targetAttr.set(CommonRoot.upProperty().formBaseAttr, oTransform.parses.formNameParse(oCurrentParse.formName));
                            oPageProperty.formNames.push(oCurrentParse.formName);
                        }
                        else {
                            CommonRoot.logWarn(941612001, oParseFile.fileBasename);
                        }
                    }
                    else if (!CommonUtil.utilsString.isEmpty(oCurrentParse.formName)) {
                        if (oItem.sourceAttr.has(CommonRoot.upProperty().formBaseAttr)) {
                            oItem.targetAttr.set(CommonRoot.upProperty().formBaseAttr, oTransform.parses.formNameParse(oCurrentParse.formName + CommonRoot.upProperty().formNameSplit + oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr)));
                        }
                    }
                    var aOutInfo_1 = [];
                    aOutInfo_1.push('<' + oItem.elmName);
                    //循环生成的目标属性
                    oItem.targetAttr.forEach(function (v, k) {
                        aOutInfo_1.push(CommonUtil.utilsString.formatString(oTransform.inc.attr_replace, { key: k, value: v }));
                    });
                    aOutInfo_1.push('>');
                    if (CommonUtil.utilsString.isEmpty(oCurrentParse.templateName)) {
                        oOut.content.push(aOutInfo_1.join(''));
                    }
                    else {
                        oTemplateInfo.templateContent.push(aOutInfo_1.join(''));
                    }
                }
                //初始化内容数组
                oCurrentParse.textContents = [];
                oCurrentParse.elmArrays.push(oItem);
            },
            ontext: function (sText) {
                //内容数据添加进去
                oCurrentParse.textContents.push(sText);
            },
            onclosetag: function (sName) {
                var oItem = oCurrentParse.elmArrays[oCurrentParse.elmArrays.length - 1];
                //判断如果是模板 则递归调用自己进行输出
                if (oItem.elmType == 2) {
                    var oNewParse = Object.assign(oParseFile);
                    oNewParse.fileContent = oCurrentParse.textContents.join('');
                    var oTextOut = new Mexport().parseHtml(oLocalConfig, oTransform, oNewParse);
                }
                else if (oItem.elmType == 4) {
                    //oItem.sourceContent = oCurrentParse.textContents.join('');
                    oOut.templateInfos.push(oTemplateInfo);
                    oCurrentParse.templateName = '';
                }
                else if (oItem.elmType === 3) {
                    var sJson = oCurrentParse.textContents.join('');
                    oOut.pageConfig = CommonUtil.utilsHelper.deepAssign(oTransform.pageConfig, CommonUtil.utilsJson.parse(sJson));
                }
                else if (oItem.elmType == 1) {
                    oItem.sourceContent += oCurrentParse.textContents.join('');
                }
                else if (oItem.elmType == 5) {
                    var oScript = new AimParse.MtransformPageScript();
                    oScript.scriptContent = oCurrentParse.textContents.join('');
                    if (oItem.sourceAttr.has("type")) {
                        oScript.scriptType = oItem.sourceAttr.get('type');
                    }
                    oOut.scriptInfos.push(oScript);
                }
                //如果是基本元素  则添加结束标记
                if (oItem.elmType == 1) {
                    if (oItem.sourceName === CommonRoot.upProperty().pageElmentForm) {
                        oCurrentParse.formName = '';
                    }
                    var aOutInfo = [];
                    aOutInfo.push(oItem.sourceContent);
                    aOutInfo.push('</' + oItem.elmName);
                    aOutInfo.push('>');
                    if (CommonUtil.utilsString.isEmpty(oCurrentParse.templateName)) {
                        oOut.content.push(aOutInfo.join(''));
                    }
                    else {
                        oTemplateInfo.templateContent.push(aOutInfo.join(''));
                    }
                }
                oCurrentParse.textContents = [];
                oCurrentParse.elmArrays.pop();
            }
        }, {
            decodeEntities: true
        });
        //转换处理文件内容
        parser.write(oParseFile.fileContent);
        parser.end();
        oTransform.outFormat.contentFormat(oOut);
        oOut.pageProperty = oPageProperty;
        return oOut;
    };
    return Mexport;
}());
module.exports = new Mexport();
