

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MreactFbase implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.formBaseAuto(oItem);
        processItem.styleBaseAuto(oItem);


        return oItem;
    }

}




export =new MreactFbase();
