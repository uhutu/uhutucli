"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "background-color", "backgroundColor");
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "font-color", "color");
        item_support_1.ItemSupportReact.checkPropWithEmpty(oItem, "border-radius", "borderRadius");
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "title", "title");
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "button-text", "buttonText");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
