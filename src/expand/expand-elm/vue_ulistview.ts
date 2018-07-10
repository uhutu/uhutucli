
import CommonRoot = require("../../base/common/root");

import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportVue as processItem} from "../../project/support-operate/item_support";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        //processItem.checkPropWithEmpty(oItem, "text", "value");

        let macroName = processItem.upPropValue(oItem, 'macro');


        oItem.sourceContent=`<`+macroName+` v-for="(item, index) in vdata_list"
        `+CommonRoot.upProperty().vueBind+`item="item"
        `+CommonRoot.upProperty().vueBind+`index="index"
        `+CommonRoot.upProperty().vueBind+`key="item.id"></`+macroName+`>`;


        let listSource = processItem.upPropValue(oItem, 'list-source');

        oItem.readScript=listSource+`.then((data)=>{ baby_support.dataShowListPage(_self,data)})`;

        return oItem;
    }

}




export =new MexpandReactUicon();
