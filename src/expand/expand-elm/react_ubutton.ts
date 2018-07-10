

import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportReact as processItem} from "../../project/support-operate/item_support";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {

        processItem.checkPropWithQuotes(oItem,"background-color","backgroundColor");
        processItem.checkPropWithQuotes(oItem,"font-color","color");
        processItem.checkPropWithEmpty(oItem,"border-radius","borderRadius");
        processItem.checkPropWithQuotes(oItem,"title","title");
        processItem.checkPropWithQuotes(oItem,"button-text","buttonText");

        return oItem;
    }

}




export =new MexpandReactUicon();
