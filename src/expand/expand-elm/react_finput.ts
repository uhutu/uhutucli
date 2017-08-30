

import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportReact as processItem} from "../../project/support-operate/item_support";
import {RootExpandReactElm} from "../../expand/aim-expand/root_elm";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {
        
        processItem.formBaseAuto(oItem);
        processItem.propertyBaseAuto(oItem);

        new RootExpandReactElm().textInput(oItem);

        return oItem;
    }

}




export =new MexpandReactUicon();
