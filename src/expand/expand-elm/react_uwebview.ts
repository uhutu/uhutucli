

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");

import { RootExpandReactElm } from "../../expand/aim-expand/root_elm";
class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.propertyBaseAuto(oItem);

        processItem.checkPropFull(oItem, "html-source", "plusHtmlSource", "{(data)=>{return ", "}}", "");

        return oItem;
    }

}




export =new MexpandReactUicon();
