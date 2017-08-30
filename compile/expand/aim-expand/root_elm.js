"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_support_1 = require("../../project/support-operate/item_support");
var RootExpandReactElm = (function () {
    function RootExpandReactElm() {
    }
    RootExpandReactElm.prototype.textInput = function (oItem) {
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "placeholder", "placeholder");
        item_support_1.ItemSupportReact.checkPropWithBrace(oItem, "secure", "secureTextEntry");
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "keyboard", "keyboardType");
        item_support_1.ItemSupportReact.checkPropWithBrace(oItem, "multiline", "multiline");
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "placeholder-color", "placeholderTextColor");
        item_support_1.ItemSupportReact.checkPropWithBrace(oItem, "form-max-size", "maxLength");
        item_support_1.ItemSupportReact.checkEventFull(oItem, "change-text", "onChangeText", "{(text)=>{", "}}", "");
        oItem.targetAttr.set('underlineColorAndroid', '"transparent"');
        oItem.targetAttr.set('autoCapitalize', '"none"');
        return oItem;
    };
    return RootExpandReactElm;
}());
exports.RootExpandReactElm = RootExpandReactElm;
