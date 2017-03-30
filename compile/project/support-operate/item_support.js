"use strict";
var dataAttr = {
    //属性值
    "prop": "data-p-",
    //事件
    "event": 'data-on-',
    //状态设置
    "state": 'data-state-'
};
var MprocessItem = (function () {
    function MprocessItem() {
    }
    /**
     * 使用引号修改属性
     */
    MprocessItem.prototype.checkPropWithQuotes = function (oItem, sSource, sTarget) {
        this.checkPropFull(oItem, sSource, sTarget, "\"", "\"");
    };
    /**
     * 直接属性  不增加标记
     */
    MprocessItem.prototype.checkPropWithEmpty = function (oItem, sSource, sTarget) {
        this.checkPropFull(oItem, sSource, sTarget, "", "");
    };
    MprocessItem.prototype.checkPropFull = function (oItem, sSource, sTarget, sLeft, sRight) {
        this.zeroFieldCheck(oItem, sSource, sTarget, dataAttr.prop, sLeft, sRight);
    };
    MprocessItem.prototype.checkEventFull = function (oItem, sSource, sTarget, sLeft, sRight) {
        this.zeroFieldCheck(oItem, sSource, sTarget, dataAttr.event, sLeft, sRight);
    };
    MprocessItem.prototype.checkStateFull = function (oItem, sSource, sTarget, sLeft, sRight) {
        this.zeroFieldCheck(oItem, sSource, sTarget, dataAttr.state, sLeft, sRight);
    };
    /**
     * 直接属性  不增加标记
     */
    MprocessItem.prototype.zeroFieldCheck = function (oItem, sSource, sTarget, sAttr, sLeft, sRight) {
        if (oItem.sourceAttr.has(sAttr + sSource)) {
            oItem.targetAttr.set(sTarget, sLeft + oItem.sourceAttr.get(sAttr + sSource) + sRight);
        }
    };
    return MprocessItem;
}());
module.exports = new MprocessItem();
