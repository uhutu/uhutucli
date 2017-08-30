"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.VueFormAuto(oItem);
        var sFieldName = "";
        if (oItem.targetAttr.has("v-model")) {
            sFieldName = oItem.targetAttr.get("v-model");
            oItem.targetAttr.delete('v-model');
            //oItem.targetAttr.set("v-model", oItem.targetAttr.get("v-model")+"_f_text");
        }
        processItem.styleVueAuto(oItem);
        var sShowType = processItem.upPropValue(oItem, 'form-show-type');
        if (sShowType === "report") {
            var sItemSource = processItem.upPropValue(oItem, 'form-source-items');
            /*
            oItem.sourceContent = `<el-checkbox-group v-model="` + sFieldName + `">
<el-checkbox-button v-for="item in item_data.upItems('`+ sItemSource + `')" :label="item.text" :key="item.value">{{item.text}}</el-checkbox-button>
</el-checkbox-group>`;
            */
            oItem.sourceContent = '<u-select-report v-bind:source="item_data.upItems(\'' + sItemSource + '\')" v-model="' + sFieldName + '"></u-select>';
        }
        else {
            oItem.sourceContent = "{{" + sFieldName + "_f_text" + "}}";
        }
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
