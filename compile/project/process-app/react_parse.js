"use strict";
var CommonRoot = require("../../base/common/root");
var CTF = require("../../project/aim-project/aim_parse");
var processItem = require("../../project/support-operate/item_support");
var CappElms = (function () {
    function CappElms() {
    }
    CappElms.prototype.upProcess = function (oTransform, oItem) {
        return new CTF.MtransformParseHelper().upBaseElm(oTransform, oItem);
    };
    return CappElms;
}());
var CappSub = (function () {
    function CappSub() {
    }
    CappSub.styleParse = function (sClassStyle) {
        var aStyle = [];
        sClassStyle.split(' ').forEach(function (f) {
            aStyle.push("styles." + f);
        });
        return "[" + aStyle.join(',') + "]";
    };
    CappSub.prototype.attrParse = function (oItem) {
        oItem.sourceAttr.forEach(function (value, key) {
            if (key === "class") {
                oItem.targetAttr.set("style", CappSub.styleParse(oItem.sourceAttr.get("class")));
                //oItem.elmProcess.styleName.push(value);
            }
            processItem.checkEventFull(oItem, "press", "onPress", "()=>{", "}");
            processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");
            processItem.checkEventFull(oItem, "value-change", "onValueChange", "(value)=>{", "}");
            processItem.checkEventFull(oItem, "link", "onPress", "()=>{top_support.pageNav('", "',this)}");
            processItem.checkStateFull(oItem, "value", "value", "", "");
        });
        return oItem;
    };
    return CappSub;
}());
var CappOut = (function () {
    function CappOut() {
    }
    CappOut.prototype.contentFormat = function (oOut) {
        for (var i = 0, j = oOut.content.length; i < j; i++) {
            oOut.content[i] = this.forReplace(oOut.content[i]);
        }
        return oOut;
    };
    CappOut.prototype.forReplace = function (sStr) {
        var sReturn = sStr;
        if (sStr.indexOf(CommonRoot.upProperty().regexOutBegin) > -1) {
            var reg = new RegExp("\\" + CommonRoot.upProperty().regexOutBegin + CommonRoot.upProperty().regexBaseString + "\\" + CommonRoot.upProperty().regexOutEnd, "g");
            var r = [];
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
    };
    return CappOut;
}());
var Mexport = (function () {
    function Mexport() {
        this.elms = new CappElms();
        this.inc = {
            attr_replace: " {key}={{value}} "
        };
        this.parses = new CappSub();
        this.pageConfig = new CTF.MbasePageConfig();
        this.outFormat = new CappOut();
    }
    return Mexport;
}());
module.exports = new Mexport();
