import CommonRoot = require("../../base/common/root");


import * as CTF from "../../project/aim-project/aim_parse";

import {ItemSupportReact as processItem} from "../../project/support-operate/item_support";


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {



        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");

        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");

        //let macroName = processItem.upXaryValue(oItem, 'macro');


        

        oItem.sourceContent='{this.'+CommonRoot.upProperty().templateXname+'render_' + processItem.upXaryValue(oItem, 'macro') +'('+processItem.upXaryValue(oItem, 'source')+')}';

        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");


        return oItem;
    }

}




export =new MexpandReactUicon();
