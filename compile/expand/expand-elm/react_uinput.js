"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.checkPropWithQuotes(oItem, "placeholder", "placeholder");
        processItem.checkPropWithQuotes(oItem, "secure", "secureTextEntry");
        processItem.checkPropWithQuotes(oItem, "keyboard", "keyboardType");
        processItem.checkPropWithQuotes(oItem, "multiline", "multiline");
        oItem.targetAttr.set('underlineColorAndroid', '"transparent"');
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
