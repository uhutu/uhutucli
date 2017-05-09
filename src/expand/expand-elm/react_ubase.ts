

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {

        processItem.styleBaseAuto(oItem);
        processItem.propertyBaseAuto(oItem);
        return oItem;
    }

}




export =new MexpandReactUicon();
