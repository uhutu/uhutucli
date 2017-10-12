"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "text", "value");
        var sFontName = item_support_1.ItemSupportVue.VuePropFormat(item_support_1.ItemSupportVue.upPropValue(oItem, 'text'));
        oItem.sourceContent = sFontName;
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
