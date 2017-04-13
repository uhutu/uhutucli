

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.checkPropWithEmpty(oItem, "form-source-items", "formSourceItems");
        processItem.checkPropWithQuotes(oItem, "form-value", "formValue");

        processItem.checkPropWithEmpty(oItem, "max-number", "maxNumber");

        return oItem;
    }

}




export =new MexpandReactUicon();
