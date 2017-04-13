

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        processItem.checkPropWithQuotes(oItem,"placeholder","placeholder");
        processItem.checkPropWithEmpty(oItem,"secure","secureTextEntry");
        processItem.checkPropWithQuotes(oItem,"keyboard","keyboardType");

        processItem.checkPropWithEmpty(oItem,"multiline","multiline");

        oItem.targetAttr.set('underlineColorAndroid','"transparent"');

        return oItem;
    }

}




export =new MexpandReactUicon();
