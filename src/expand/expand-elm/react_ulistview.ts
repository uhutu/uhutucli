import CommonRoot = require("../../base/common/root");


import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {



        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");

        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");

        let macroName = processItem.upPropValue(oItem, 'macro');


        oItem.targetAttr.set('renderRow', '{this.'+CommonRoot.upProperty().templateXname+'render_' + macroName + '.bind(this)}');

        oItem.targetAttr.set('dataSource', '{this.state.'+CommonRoot.upProperty().templateXname+'data_' + macroName+"}");

        oItem.targetAttr.set('enableEmptySections', '{true}');

        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");


        return oItem;
    }

}




export =new MexpandReactUicon();
