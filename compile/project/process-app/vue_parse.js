"use strict";
var CTF = require("../../project/aim-project/aim_parse");
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
            //判断如果有点 则是特殊定义操作
            if (f.indexOf('.') > -1) {
                aStyle.push(f);
            }
            else {
                aStyle.push(f);
            }
        });
        return aStyle.length > 1 ? (aStyle.join(' ')) : aStyle[0];
    };
    CappSub.prototype.formNameParse = function (sName) {
        return "" + sName + "";
    };
    CappSub.prototype.attrParse = function (oItem) {
        oItem.sourceAttr.forEach(function (value, key) {
            if (key === "class") {
                oItem.targetAttr.set("class", "\"" + oItem.sourceAttr.get("class") + "\"");
            }
        });
        return oItem;
    };
    return CappSub;
}());
var CappOut = (function () {
    function CappOut() {
    }
    CappOut.prototype.contentFormat = function (oOut) {
        return oOut;
    };
    return CappOut;
}());
var MappParse = (function () {
    function MappParse() {
        this.elms = new CappElms();
        this.inc = {
            attr_replace: " {key}={value} "
        };
        this.parses = new CappSub();
        this.pageConfig = new CTF.MbasePageConfig();
        this.outFormat = new CappOut();
    }
    return MappParse;
}());
module.exports = new MappParse();
