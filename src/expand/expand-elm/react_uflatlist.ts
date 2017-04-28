import CommonRoot = require("../../base/common/root");


import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {



        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");

        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");

        let macroName = processItem.upPropValue(oItem, 'macro');




        oItem.targetAttr.set('renderItem', '{({item}) => this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '(item)}');

        oItem.targetAttr.set('data', '{this.state.' + CommonRoot.upProperty().templateXname + 'data_' + macroName + "}");


        let sRefreshScript = processItem.upEventValue(oItem, 'refresh');

        if (sRefreshScript) {

            oItem.targetAttr.set('refreshing', '{false}');

            oItem.targetAttr.set('onRefresh', '{()=>{' + sRefreshScript+ '}}');

        }



        //let sEndScript = processItem.upEventValue(oItem, 'endReached');

        processItem.checkEventFull(oItem, "end-reached", "onEndReached", "{(info)=>{", "}}", "");
        processItem.checkPropWithBrace(oItem,"threshold","onEndReachedThreshold");
        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");


        return oItem;
    }

}




export =new MexpandReactUicon();
