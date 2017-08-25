

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        //processItem.checkPropWithEmpty(oItem, "text", "value");

        let macroName = processItem.upPropValue(oItem, 'macro');


        oItem.sourceContent=`<`+macroName+` v-for="(item, index) in list_data"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.id"></`+macroName+`>`;


        let listSource = processItem.upPropValue(oItem, 'list-source');

        oItem.readScript=listSource+`.then((data)=>{_self.list_data=data;})`;

        return oItem;
    }

}




export =new MexpandReactUicon();
