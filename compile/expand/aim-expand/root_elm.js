"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonRoot = require("../../base/common/root");
var RootExpandElm = (function () {
    function RootExpandElm() {
    }
    RootExpandElm.prototype.upPropValue = function (oItem, sPropName) {
        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrProp);
    };
    RootExpandElm.prototype.upXaryValue = function (oItem, sPropName) {
        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrXary);
    };
    RootExpandElm.prototype.zeroUpPropValue = function (oItem, sPropName, sAttr) {
        return oItem.sourceAttr.get(sAttr + sPropName);
    };
    /**
     * 使用引号修改属性
     */
    RootExpandElm.prototype.checkPropWithQuotes = function (oItem, sSource, sTarget) {
        this.checkPropFull(oItem, sSource, sTarget, "\"", "\"");
    };
    /**
     * 直接属性  不增加标记
     */
    RootExpandElm.prototype.checkPropWithEmpty = function (oItem, sSource, sTarget) {
        this.checkPropFull(oItem, sSource, sTarget, "", "");
    };
    RootExpandElm.prototype.checkPropFull = function (oItem, sSource, sTarget, sLeft, sRight) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrProp, sLeft, sRight);
    };
    RootExpandElm.prototype.checkEventFull = function (oItem, sSource, sTarget, sLeft, sRight) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrEvent, sLeft, sRight);
    };
    RootExpandElm.prototype.checkStateFull = function (oItem, sSource, sTarget, sLeft, sRight) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrState, sLeft, sRight);
    };
    /**
     * 直接属性  不增加标记
     */
    RootExpandElm.prototype.zeroFieldCheck = function (oItem, sSource, sTarget, sAttr, sLeft, sRight) {
        if (oItem.sourceAttr.has(sAttr + sSource)) {
            oItem.targetAttr.set(sTarget, sLeft + oItem.sourceAttr.get(sAttr + sSource) + sRight);
        }
    };
    RootExpandElm.prototype.formBaseAuto = function (oItem) {
        //数据列表源编号
        this.checkPropWithQuotes(oItem, "form-source-items", "formSourceItems");
        //默认值
        this.checkPropWithQuotes(oItem, "form-default-value", "formDefaultValue");
        //最小长度
        this.checkPropWithQuotes(oItem, "form-min-size", "formMinSize");
        //最大长度
        this.checkPropWithQuotes(oItem, "form-max-size", "formMaxSize");
        //正则表达式编号
        this.checkPropWithQuotes(oItem, "form-regex-code", "formRegexCode");
    };
    return RootExpandElm;
}());
exports.RootExpandElm = RootExpandElm;
