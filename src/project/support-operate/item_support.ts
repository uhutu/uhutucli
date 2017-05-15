import CommonRoot = require("../../base/common/root");

import * as CTF from "../../project/aim-project/aim_parse";





class MprocessItem {



    upPropValue(oItem: CTF.ItransformItemInfo, sPropName: string) {

        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrProp);
    }


    upEventValue(oItem: CTF.ItransformItemInfo, sPropName: string) {

        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrEvent);
    }


    upXaryValue(oItem: CTF.ItransformItemInfo, sPropName: string) {

        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrXary);
    }


    zeroUpPropValue(oItem: CTF.ItransformItemInfo, sPropName, sAttr) {
        return oItem.sourceAttr.get(sAttr + sPropName);

    }


    /**
     * 使用引号修改属性
     */
    checkPropWithQuotes(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        this.checkPropFull(oItem, sSource, sTarget, "", "", "\"");

    }


    checkPropWithBrace(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {


        this.checkPropFull(oItem, sSource, sTarget, "{", "}", "");

    }

    /**
     * 直接属性  不增加标记
     */
    checkPropWithEmpty(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {


        this.checkPropFull(oItem, sSource, sTarget, "", "", "");

    }

    checkPropFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string, sSign: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrProp, sLeft, sRight, sSign);
    }



    checkEventFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string, sSign: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrEvent, sLeft, sRight, sSign);
    }


    checkStateFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string, sSign: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrState, sLeft, sRight, sSign);
    }



    checkStyle(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrStyle, "{styles.", "}", "");

    }



    /**
     * 直接属性  不增加标记
     */
    zeroFieldCheck(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sAttr: string, sLeft: string, sRight: string, sSign: string) {

        if (oItem.sourceAttr.has(sAttr + sSource)) {

            let sVal = oItem.sourceAttr.get(sAttr + sSource);


            if (!sVal.startsWith('@')) {
                sVal = sSign + sVal + sSign;
            }
            else {
                sVal = sVal.substr(1);
            }



            oItem.targetAttr.set(sTarget, sLeft + sVal + sRight);
        }

    }



    formBaseAuto(oItem: CTF.ItransformItemInfo) {


        //数据列表源编号
        this.checkPropWithQuotes(oItem, "form-source-items", "formSourceItems");

        //默认值
        this.checkPropWithQuotes(oItem, "form-default-value", "formDefaultValue");

        //最小长度
        this.checkPropWithQuotes(oItem, "form-min-size", "formMinSize");

        //最大长度
        this.checkPropWithQuotes(oItem, "form-max-size", "formMaxSize");

        //正则表达式编号
        this.checkPropWithQuotes(oItem, "form-regex-code", "formRegexCode");

        //展示类型
        this.checkPropWithQuotes(oItem, "form-show-type", "formShowType");

        //扩展显示字符串
        this.checkPropWithQuotes(oItem, "form-extend-display", "formExtendDisplay");

    }


    styleBaseAuto(oItem: CTF.ItransformItemInfo) {



        this.checkStyle(oItem, "item-touch", "styleItemTouch");
        this.checkStyle(oItem, "item-box", "styleItemBox");
        this.checkStyle(oItem, "item-text", "styleItemText");
        this.checkStyle(oItem, "item-icon", "styleItemIcon");
        this.checkStyle(oItem, "item-active", "styleItemActive");

        this.checkStyle(oItem, 'main-touch', 'styleMainTouch');
        this.checkStyle(oItem, 'main-view', 'styleMainView');

        this.checkStyle(oItem, "main-icon", "styleMainIcon");
        this.checkStyle(oItem, "main-text", "styleMainText");

    }

    /**
     * 基本属性检测
     * 
     * @param {CTF.ItransformItemInfo} oItem 
     * 
     * @memberof MprocessItem
     */
    propertyBaseAuto(oItem: CTF.ItransformItemInfo) {


        this.checkPropWithQuotes(oItem, "name", "pName");

        this.checkPropWithQuotes(oItem, "color", "pColor");
        this.checkPropWithQuotes(oItem, "show", "pShow");

        this.checkPropWithQuotes(oItem, "family", "pFamily");
        this.checkPropWithQuotes(oItem, "text", "pText");

        this.checkPropWithQuotes(oItem, "subscribe", "pSubscribe");

    }




}

export = new MprocessItem();
