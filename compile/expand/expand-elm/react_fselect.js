"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.checkPropWithEmpty(oItem, "form-source-items", "formSourceItems");
        processItem.checkPropWithQuotes(oItem, "form-value", "formValue");
        processItem.checkPropWithEmpty(oItem, "max-number", "maxNumber");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
