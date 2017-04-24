

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");

import {RootExpandElm} from "../../expand/aim-expand/root_elm";

class MexpandReactUicon extends RootExpandElm  implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {

        
        processItem.checkPropWithQuotes(oItem,"name","name");


        
        processItem.checkPropWithEmpty(oItem,"size","size");

        processItem.checkPropWithQuotes(oItem,"color","color");

        processItem.checkPropWithQuotes(oItem,"reverse","reverse");

        

       

        return oItem;
    }

}




export =new MexpandReactUicon();
