"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.formBaseAuto(oItem);
        processItem.styleBaseAuto(oItem);
        processItem.checkEventFull(oItem, "value-change", "onValueChange", "{(item)=>{", "}}", "");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
