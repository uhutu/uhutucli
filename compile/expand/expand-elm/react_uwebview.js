"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.propertyBaseAuto(oItem);
        processItem.checkPropFull(oItem, "html-source", "plusHtmlSource", "{(data)=>{return ", "}}", "");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
