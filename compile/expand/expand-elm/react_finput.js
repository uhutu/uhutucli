"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.formBaseAuto(oItem);
        processItem.checkPropWithQuotes(oItem, "placeholder", "placeholder");
        processItem.checkPropWithQuotes(oItem, "secure", "secureTextEntry");
        processItem.checkPropWithQuotes(oItem, "keyboard", "keyboardType");
        processItem.checkPropWithBrace(oItem, "multiline", "multiline");
        processItem.checkPropWithBrace(oItem, "form-max-size", "maxLength");
        oItem.targetAttr.set('underlineColorAndroid', '"transparent"');
        oItem.targetAttr.set('autoCapitalize', '"none"');
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
