

import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportReact as processItem} from "../../project/support-operate/item_support";
import { RootExpandReactElm } from "../../expand/aim-expand/root_elm";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {
        processItem.propertyBaseAuto(oItem);
        processItem.formBaseAuto(oItem);
        processItem.styleBaseAuto(oItem);
        
        //processItem.checkEventFull(oItem, "value-change", "onValueChange", "{(item)=>{", "}}", "");


        return oItem;
    }

}




export =new MexpandReactUicon();
