import CommonRoot = require("../../base/common/root");


import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportVue as processItem} from "../../project/support-operate/item_support";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {


        oItem.elmName=processItem.upXaryValue(oItem, 'macro');
       
        processItem.checkXaryFull(oItem,'source',CommonRoot.upProperty().vueBind+'item','','','');

        return oItem;
    }

}




export =new MexpandReactUicon();
