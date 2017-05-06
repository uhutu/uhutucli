import CommonRoot = require("../../base/common/root");


import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {





        let macroName = processItem.upPropValue(oItem, 'macro');

        /*
        oItem.targetAttr.set('renderRow', '{this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '.bind(this)}');

        oItem.targetAttr.set('dataSource', '{this.state.' + CommonRoot.upProperty().templateXname + 'data_' + macroName + "}");

        oItem.targetAttr.set('enableEmptySections', '{true}');

        

        let sRefreshScript = processItem.upEventValue(oItem, 'refresh');

        if (sRefreshScript) {

            let aStr = '{<RefreshControl refreshing={false} onRefresh={()=>{' + sRefreshScript + '}} />}';

            oItem.targetAttr.set('refreshControl', aStr);


        }

        processItem.checkEventFull(oItem, "end-reached", "onEndReached", "{(info)=>{", "}}", "");
        processItem.checkPropWithBrace(oItem, "threshold", "onEndReachedThreshold");
        */

        oItem.targetAttr.set('renderRow', '{this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '.bind(this)}');

        processItem.checkPropFull(oItem, "list-source", "plusListSource","{(data)=>{return ","}}","");


        processItem.checkPropWithQuotes(oItem, "macro", "plusMacroName");


        return oItem;
    }

}




export =new MexpandReactUicon();
