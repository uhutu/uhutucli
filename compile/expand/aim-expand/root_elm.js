"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processItem = require("../../project/support-operate/item_support");
var RootExpandReactElm = (function () {
    function RootExpandReactElm() {
    }
    RootExpandReactElm.prototype.textInput = function (oItem) {
        processItem.checkPropWithQuotes(oItem, "placeholder", "placeholder");
        processItem.checkPropWithBrace(oItem, "secure", "secureTextEntry");
        processItem.checkPropWithQuotes(oItem, "keyboard", "keyboardType");
        processItem.checkPropWithBrace(oItem, "multiline", "multiline");
        processItem.checkPropWithQuotes(oItem, "placeholder-color", "placeholderTextColor");
        processItem.checkPropWithBrace(oItem, "form-max-size", "maxLength");
        oItem.targetAttr.set('underlineColorAndroid', '"transparent"');
        oItem.targetAttr.set('autoCapitalize', '"none"');
        return oItem;
    };
    return RootExpandReactElm;
}());
exports.RootExpandReactElm = RootExpandReactElm;
