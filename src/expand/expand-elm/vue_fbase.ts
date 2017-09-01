

import * as CTF from "../../project/aim-project/aim_parse";

import { ItemSupportVue as processItem } from "../../project/support-operate/item_support";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.formBaseAuto(oItem);
        processItem.VueFormAuto(oItem);
        processItem.styleBaseAuto(oItem);

        return oItem;
    }

}




export =new MexpandReactUicon();
