"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        item_support_1.ItemSupportVue.VueFormAuto(oItem);
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
