"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var root_elm_1 = require("../../expand/aim-expand/root_elm");
var MexpandReactUicon = /** @class */ (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        item_support_1.ItemSupportReact.formBaseAuto(oItem);
        item_support_1.ItemSupportReact.propertyBaseAuto(oItem);
        new root_elm_1.RootExpandReactElm().textInput(oItem);
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
