

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {

        processItem.formBaseAuto(oItem);


        processItem.checkPropWithQuotes(oItem,"placeholder","placeholder");
        processItem.checkPropWithQuotes(oItem,"secure","secureTextEntry");
        processItem.checkPropWithQuotes(oItem,"keyboard","keyboardType");

        processItem.checkPropWithBrace(oItem,"multiline","multiline");

        processItem.checkPropWithBrace(oItem,"form-max-size","maxLength");

        oItem.targetAttr.set('underlineColorAndroid','"transparent"');
        oItem.targetAttr.set('autoCapitalize','"none"');

        return oItem;
    }

}




export =new MexpandReactUicon();
