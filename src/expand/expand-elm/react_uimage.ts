

import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportReact as processItem} from "../../project/support-operate/item_support";



class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {

        processItem.checkPropFull(oItem,"src","source","require(",")","'");
        processItem.checkPropWithQuotes(oItem,"mode","resizeMode");
        return oItem;
    }

}




export =new MexpandReactUicon();
