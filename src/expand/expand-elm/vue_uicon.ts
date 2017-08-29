import CommonRoot = require("../../base/common/root");


import * as CTF from "../../project/aim-project/aim_parse";

import processItem = require("../../project/support-operate/item_support");


class MexpandReactUicon implements CTF.ItransformExpandItem {

    expandOpen(oItem: CTF.ItransformItemInfo) {



        let sFontName = processItem.VuePropFormat(processItem.upPropValue(oItem, 'name'));
        let sFontFamily = '';
        if (processItem.upPropValue(oItem, 'family')) {
            sFontFamily = processItem.VuePropFormat(processItem.upPropValue(oItem, 'family'));
        }

        if (sFontName.indexOf('#') > -1) {





            oItem.targetAttr.set(CommonRoot.upProperty().vueBind + 'class', '\'font_\'+' + sFontFamily + '+\' font_\'+' + sFontFamily + '+\'_\'+' + sFontName);
        }



        let sColor=processItem.upPropValue(oItem,"color");

        if(sColor){
            oItem.targetAttr.set(CommonRoot.upProperty().vueBind + 'style', "'color:'+"+sColor);
        }



        return oItem;
    }

}




export =new MexpandReactUicon();
