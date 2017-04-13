

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {

        
        processItem.checkPropWithQuotes(oItem,"name","name");


        
        processItem.checkPropWithEmpty(oItem,"size","size");

        processItem.checkPropWithQuotes(oItem,"color","color");

        processItem.checkPropWithEmpty(oItem,"reverse","reverse");

        

       

        return oItem;
    }

}




export =new MexpandReactUicon();
