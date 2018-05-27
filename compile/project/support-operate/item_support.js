"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommonRoot = require("../../base/common/root");
var MprocessItem = /** @class */ (function () {
    function MprocessItem() {
    }
    MprocessItem.checkStyle = function (oItem, sSource, sTarget) { };
    ;
    MprocessItem.upPropValue = function (oItem, sPropName) {
        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrProp);
    };
    MprocessItem.upEventValue = function (oItem, sPropName) {
        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrEvent);
    };
    MprocessItem.upXaryValue = function (oItem, sPropName) {
        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrXary);
    };
    MprocessItem.zeroUpPropValue = function (oItem, sPropName, sAttr) {
        return oItem.sourceAttr.get(sAttr + sPropName);
    };
    /**
     * 使用引号修改属性
     */
    MprocessItem.checkPropWithQuotes = function (oItem, sSource, sTarget) {
        this.checkPropFull(oItem, sSource, sTarget, "", "", "\"");
    };
    MprocessItem.checkPropWithBrace = function (oItem, sSource, sTarget) {
        this.checkPropFull(oItem, sSource, sTarget, "{", "}", "");
    };
    /**
     * 直接属性  不增加标记
     */
    MprocessItem.checkPropWithEmpty = function (oItem, sSource, sTarget) {
        this.checkPropFull(oItem, sSource, sTarget, "", "", "");
    };
    MprocessItem.checkPropFull = function (oItem, sSource, sTarget, sLeft, sRight, sSign) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrProp, sLeft, sRight, sSign);
    };
    MprocessItem.checkXaryFull = function (oItem, sSource, sTarget, sLeft, sRight, sSign) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrXary, sLeft, sRight, sSign);
    };
    MprocessItem.checkEventFull = function (oItem, sSource, sTarget, sLeft, sRight, sSign) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrEvent, sLeft, sRight, sSign);
    };
    MprocessItem.checkStateFull = function (oItem, sSource, sTarget, sLeft, sRight, sSign) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrState, sLeft, sRight, sSign);
    };
    /**
     * 直接属性  不增加标记
     */
    MprocessItem.zeroFieldCheck = function (oItem, sSource, sTarget, sAttr, sLeft, sRight, sSign) {
        if (oItem.sourceAttr.has(sAttr + sSource)) {
            var sVal = oItem.sourceAttr.get(sAttr + sSource);
            if (!sVal.startsWith('@')) {
                sVal = sSign + sVal + sSign;
            }
            else {
                sVal = sVal.substr(1);
            }
            oItem.targetAttr.set(sTarget, sLeft + sVal + sRight);
        }
    };
    MprocessItem.formBaseAuto = function (oItem) {
        //数据列表源编号
        this.checkForm(oItem, "form-source-items", "formSourceItems");
        //默认值
        this.checkForm(oItem, "form-default-value", "formDefaultValue");
        //最小长度
        this.checkForm(oItem, "form-min-size", "formMinSize");
        //最大长度
        this.checkForm(oItem, "form-max-size", "formMaxSize");
        //正则表达式编号
        this.checkForm(oItem, "form-regex-code", "formRegexCode");
        //展示类型
        this.checkForm(oItem, "form-show-type", "formShowType");
        //扩展显示字符串
        this.checkForm(oItem, "form-extend-display", "formExtendDisplay");
        //扩展查询字符串
        this.checkForm(oItem, "form-extend-query", "formExtendQuery");
    };
    MprocessItem.styleBaseAuto = function (oItem) {
        this.checkStyle(oItem, "item-touch", "styleItemTouch");
        this.checkStyle(oItem, "item-box", "styleItemBox");
        this.checkStyle(oItem, "item-text", "styleItemText");
        this.checkStyle(oItem, "item-icon", "styleItemIcon");
        this.checkStyle(oItem, "item-active", "styleItemActive");
        this.checkStyle(oItem, 'main-touch', 'styleMainTouch');
        this.checkStyle(oItem, 'main-view', 'styleMainView');
        this.checkStyle(oItem, "main-icon", "styleMainIcon");
        this.checkStyle(oItem, "main-text", "styleMainText");
    };
    /**
     * 基本属性检测
     *
     * @param {CTF.ItransformItemInfo} oItem
     *
     * @memberof MprocessItem
     */
    MprocessItem.propertyBaseAuto = function (oItem) {
        this.checkPropWithQuotes(oItem, "name", "pName");
        this.checkPropWithQuotes(oItem, "color", "pColor");
        this.checkPropWithQuotes(oItem, "show", "pShow");
        this.checkPropWithQuotes(oItem, "family", "pFamily");
        this.checkPropWithQuotes(oItem, "text", "pText");
        this.checkPropWithQuotes(oItem, "subscribe", "pSubscribe");
    };
    MprocessItem.propertyEventAuto = function (oItem) {
        this.checkEventFull(oItem, "press", "onPress", "{(event)=>{", "}}", "");
        this.checkEventFull(oItem, "link", "onPress", "{(event)=>{top_support.pageNav(", ",this)}}", "'");
        this.checkEventFull(oItem, "value-change", "onValueChange", "{(item)=>{", "}}", "");
    };
    MprocessItem.VueEventAuto = function (oItem) {
        this.checkEventFull(oItem, "press", "onClick", "", "", "");
        this.checkEventFull(oItem, "link", CommonRoot.upProperty().vueBind + "href", "'javascript:top_support.pageNav(\\''+", "+'\\',this)'", "'");
        this.checkEventFull(oItem, "value-change", "onValueChange", "{(item)=>{", "}}", "");
    };
    MprocessItem.VuePropFormat = function (sVal) {
        return sVal.replace('@', '').replace(/\\{/, '').replace(/\\}/, '');
    };
    MprocessItem.checkForm = function (oItem, sSource, sTarget) {
    };
    return MprocessItem;
}());
var ItemSupportReact = /** @class */ (function (_super) {
    __extends(ItemSupportReact, _super);
    function ItemSupportReact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemSupportReact.checkStyle = function (oItem, sSource, sTarget) {
        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrStyle, "{styles.", "}", "");
    };
    ItemSupportReact.checkForm = function (oItem, sSource, sTarget) {
        this.checkPropWithQuotes(oItem, sSource, sTarget);
    };
    return ItemSupportReact;
}(MprocessItem));
exports.ItemSupportReact = ItemSupportReact;
var ItemSupportVue = /** @class */ (function (_super) {
    __extends(ItemSupportVue, _super);
    function ItemSupportVue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemSupportVue.VueFormAuto = function (oItem) {
        var sFieldName = oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr);
        if (oItem.targetAttr.has(CommonRoot.upProperty().formBaseAttr)) {
            oItem.targetAttr.set("v-model", 'vdata_form.' + sFieldName);
        }
        if (oItem.sourceAttr.has(CommonRoot.upProperty().formBaseAttr)) {
            oItem.formField.fieldName = oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr);
            oItem.formField.fieldType = oItem.sourceName;
        }
    };
    /**
   * 使用引号修改属性
   */
    ItemSupportVue.checkForm = function (oItem, sSource, sTarget) {
        this.checkPropWithEmpty(oItem, sSource, 'pform_' + sTarget);
    };
    ItemSupportVue.checkStyle = function (oItem, sSource, sTarget) {
        //this.checkPropWithEmpty(oItem, sSource,  'pstyle_' + sTarget);
        this.zeroFieldCheck(oItem, sSource, 'pstyle_' + sTarget, CommonRoot.upProperty().dataAttrStyle, "", "", "");
    };
    return ItemSupportVue;
}(MprocessItem));
exports.ItemSupportVue = ItemSupportVue;
