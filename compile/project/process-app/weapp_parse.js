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
    CappSub.prototype.formNameParse = function (sName) {
        return "" + sName + "";
    };
    CappSub.prototype.attrParse = function (oItem) {
        oItem.sourceAttr.forEach(function (value, key) {
            oItem.targetAttr.set(key, value);
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
            attr_replace: " {key}=\"{value}\" "
        };
        this.parses = new CappSub();
        this.pageConfig = new CTF.MbasePageConfig();
        this.outFormat = new CappOut();
    }
    return MappParse;
}());
module.exports = new MappParse();
