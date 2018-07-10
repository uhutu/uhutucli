"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = /** @class */ (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        item_support_1.ItemSupportReact.propertyBaseAuto(oItem);
        item_support_1.ItemSupportReact.formBaseAuto(oItem);
        item_support_1.ItemSupportReact.styleBaseAuto(oItem);
        //processItem.checkEventFull(oItem, "value-change", "onValueChange", "{(item)=>{", "}}", "");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
