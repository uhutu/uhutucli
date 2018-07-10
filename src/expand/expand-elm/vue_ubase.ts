

import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportVue as processItem} from "../../project/support-operate/item_support";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.checkPropWithEmpty(oItem, "text", "value");


        return oItem;
    }

}




export =new MexpandReactUicon();
