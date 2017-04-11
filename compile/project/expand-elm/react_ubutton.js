"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.checkPropWithQuotes(oItem, "background-color", "backgroundColor");
        processItem.checkPropWithQuotes(oItem, "font-color", "color");
        processItem.checkPropWithEmpty(oItem, "border-radius", "borderRadius");
        processItem.checkPropWithQuotes(oItem, "title", "title");
        processItem.checkPropWithQuotes(oItem, "button-text", "buttonText");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
