

import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {



        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");

        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");


        oItem.targetAttr.set('renderRow','this.template_'+oItem.sourceAttr.get('template')+'.bind(this)');

        oItem.targetAttr.set('dataSource','this.state.template_data_source_'+oItem.sourceAttr.get('template'));

        oItem.targetAttr.set('enableEmptySections', 'true');

        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");


        return oItem;
    }

}




export =new MexpandReactUicon();
