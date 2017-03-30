
import * as CTF from "../../project/aim-project/aim_parse";


const dataAttr = {
    //属性值
    "prop": "data-p-",
    //事件
    "event": 'data-on-',
    //状态设置
    "state":'data-state-'
}


class MprocessItem {

    /**
     * 使用引号修改属性
     */
    checkPropWithQuotes(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        this.checkPropFull(oItem, sSource, sTarget, "\"", "\"");

    }

    /**
     * 直接属性  不增加标记
     */
    checkPropWithEmpty(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {


        this.checkPropFull(oItem, sSource, sTarget, "", "");

    }

    checkPropFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, dataAttr.prop, sLeft, sRight);
    }



    checkEventFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, dataAttr.event, sLeft, sRight);
    }


    checkStateFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, dataAttr.state, sLeft, sRight);
    }




    /**
     * 直接属性  不增加标记
     */
    zeroFieldCheck(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sAttr: string, sLeft: string, sRight: string) {

        if (oItem.sourceAttr.has(sAttr + sSource)) {
            oItem.targetAttr.set(sTarget, sLeft + oItem.sourceAttr.get(sAttr + sSource) + sRight);
        }

    }


}

export = new MprocessItem();
