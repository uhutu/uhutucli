"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.checkPropWithQuotes(oItem, "placeholder", "placeholder");
        processItem.checkPropWithEmpty(oItem, "secure", "secureTextEntry");
        processItem.checkPropWithQuotes(oItem, "keyboard", "keyboardType");
        oItem.targetAttr.set('underlineColorAndroid', '"transparent"');
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
