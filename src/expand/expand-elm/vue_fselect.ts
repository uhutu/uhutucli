

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.VueFormAuto(oItem);

        let sFieldName = "";

        if (oItem.targetAttr.has("v-model")) {
            sFieldName = oItem.targetAttr.get("v-model");
            oItem.targetAttr.delete('v-model');
            //oItem.targetAttr.set("v-model", oItem.targetAttr.get("v-model")+"_f_text");


        }




        processItem.styleVueAuto(oItem);


        let sShowType = processItem.upPropValue(oItem, 'form-show-type');

        if (sShowType === "report") {

            let sItemSource = processItem.upPropValue(oItem, 'form-source-items');

            /*
            oItem.sourceContent = `<el-checkbox-group v-model="` + sFieldName + `">
<el-checkbox-button v-for="item in item_data.upItems('`+ sItemSource + `')" :label="item.text" :key="item.value">{{item.text}}</el-checkbox-button>
</el-checkbox-group>`;
            */
            oItem.sourceContent = '<u-select-report v-bind:source="item_data.upItems(\''+ sItemSource + '\')" v-model="' + sFieldName + '"></u-select>';


        } else {
            oItem.sourceContent = "{{" + sFieldName + "_f_text" + "}}";
        }


        return oItem;
    }

}




export =new MexpandReactUicon();
