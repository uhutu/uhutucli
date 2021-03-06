"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.checkPropWithQuotes(oItem, "name", "name");
        processItem.checkPropWithEmpty(oItem, "size", "size");
        processItem.checkPropWithQuotes(oItem, "color", "color");
        processItem.checkPropWithEmpty(oItem, "reverse", "reverse");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
