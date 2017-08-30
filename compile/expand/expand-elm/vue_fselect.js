"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        item_support_1.ItemSupportVue.formBaseAuto(oItem);
        item_support_1.ItemSupportVue.VueFormAuto(oItem);
        var sFieldName = "";
        if (oItem.targetAttr.has("v-model")) {
            sFieldName = oItem.targetAttr.get("v-model");
            //oItem.targetAttr.delete('v-model');
            //oItem.targetAttr.set("v-model", oItem.targetAttr.get("v-model")+"_f_text");
        }
        item_support_1.ItemSupportVue.styleBaseAuto(oItem);
        var sShowType = item_support_1.ItemSupportVue.upPropValue(oItem, 'form-show-type');
        if (sShowType === "report") {
            var sItemSource = item_support_1.ItemSupportVue.upPropValue(oItem, 'form-source-items');
            oItem.targetAttr.set('v-bind:source', 'item_data.upItems(\'' + sItemSource + '\')');
            /*
            oItem.sourceContent = `<el-checkbox-group v-model="` + sFieldName + `">
<el-checkbox-button v-for="item in item_data.upItems('`+ sItemSource + `')" :label="item.text" :key="item.value">{{item.text}}</el-checkbox-button>
</el-checkbox-group>`;
            */
            // oItem.sourceContent = '<u-select-report v-bind:source="item_data.upItems(\''+ sItemSource + '\')" v-model="' + sFieldName + '"></u-select>';
        }
        else {
            oItem.targetAttr.set('v-bind:text', sFieldName + "_f_text");
            //oItem.targetAttr.set('v-bind:source', '');
            // oItem.sourceContent = "{{" + sFieldName + "_f_text" + "}}";
        }
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
