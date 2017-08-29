"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.VueFormAuto(oItem);
        if (oItem.targetAttr.has("v-model")) {
            oItem.targetAttr.delete('v-model');
            //oItem.targetAttr.set("v-model", oItem.targetAttr.get("v-model")+"_f_text");
        }
        var sShowType = processItem.upPropValue(oItem, 'form-show-type');
        if (sShowType === "report") {
        }
        else {
            oItem.sourceContent = "{{" + oItem.targetAttr.get("v-model") + "_f_text" + "}}";
        }
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
