"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        item_support_1.ItemSupportReact.propertyBaseAuto(oItem);
        item_support_1.ItemSupportReact.checkPropFull(oItem, "html-source", "plusHtmlSource", "{(data)=>{return ", "}}", "");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
