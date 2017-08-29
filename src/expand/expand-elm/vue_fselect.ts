

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.VueFormAuto(oItem);


        if (oItem.targetAttr.has("v-model")) {

            oItem.targetAttr.delete('v-model');
            //oItem.targetAttr.set("v-model", oItem.targetAttr.get("v-model")+"_f_text");


        }

        let sShowType = processItem.upPropValue(oItem, 'form-show-type');

        if (sShowType === "report") {
            

        } else {
            oItem.sourceContent = "{{" + oItem.targetAttr.get("v-model") + "_f_text" + "}}";
        }


        return oItem;
    }

}




export =new MexpandReactUicon();
