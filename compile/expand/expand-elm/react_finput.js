"use strict";
var processItem = require("../../project/support-operate/item_support");
var root_elm_1 = require("../../expand/aim-expand/root_elm");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.formBaseAuto(oItem);
        new root_elm_1.RootExpandReactElm().textInput(oItem);
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
