import CommonRoot = require("../../base/common/root");

import * as CTF from "../../project/aim-project/aim_parse";





abstract class MprocessItem {


    static checkStyle(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) { };


    static upPropValue(oItem: CTF.ItransformItemInfo, sPropName: string) {

        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrProp);
    }


    static upEventValue(oItem: CTF.ItransformItemInfo, sPropName: string) {

        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrEvent);
    }


    static upXaryValue(oItem: CTF.ItransformItemInfo, sPropName: string) {

        return this.zeroUpPropValue(oItem, sPropName, CommonRoot.upProperty().dataAttrXary);
    }


    static zeroUpPropValue(oItem: CTF.ItransformItemInfo, sPropName, sAttr) {
        return oItem.sourceAttr.get(sAttr + sPropName);

    }


    /**
     * 使用引号修改属性
     */
    static checkPropWithQuotes(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        this.checkPropFull(oItem, sSource, sTarget, "", "", "\"");

    }


    static checkPropWithBrace(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {


        this.checkPropFull(oItem, sSource, sTarget, "{", "}", "");

    }

    /**
     * 直接属性  不增加标记
     */
    static checkPropWithEmpty(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {


        this.checkPropFull(oItem, sSource, sTarget, "", "", "");

    }

    static checkPropFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string, sSign: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrProp, sLeft, sRight, sSign);
    }


    static checkXaryFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string, sSign: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrXary, sLeft, sRight, sSign);
    }




    static checkEventFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string, sSign: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrEvent, sLeft, sRight, sSign);
    }


    static checkStateFull(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sLeft: string, sRight: string, sSign: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrState, sLeft, sRight, sSign);
    }











    /**
     * 直接属性  不增加标记
     */
    static zeroFieldCheck(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string, sAttr: string, sLeft: string, sRight: string, sSign: string) {

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



    static formBaseAuto(oItem: CTF.ItransformItemInfo) {


        //数据列表源编号
        this.checkForm(oItem, "form-source-items", "formSourceItems");

        //默认值
        this.checkForm(oItem, "form-default-value", "formDefaultValue");

        //最小长度
        this.checkForm(oItem, "form-min-size", "formMinSize");

        //最大长度
        this.checkForm(oItem, "form-max-size", "formMaxSize");

        //正则表达式编号
        this.checkForm(oItem, "form-regex-code", "formRegexCode");

        //展示类型
        this.checkForm(oItem, "form-show-type", "formShowType");

        //扩展显示字符串
        this.checkForm(oItem, "form-extend-display", "formExtendDisplay");


        //扩展查询字符串
        this.checkForm(oItem, "form-extend-query", "formExtendQuery");

    }


    static styleBaseAuto(oItem: CTF.ItransformItemInfo) {



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
    static propertyBaseAuto(oItem: CTF.ItransformItemInfo) {


        this.checkPropWithQuotes(oItem, "name", "pName");

        this.checkPropWithQuotes(oItem, "color", "pColor");
        this.checkPropWithQuotes(oItem, "show", "pShow");

        this.checkPropWithQuotes(oItem, "family", "pFamily");
        this.checkPropWithQuotes(oItem, "text", "pText");

        this.checkPropWithQuotes(oItem, "subscribe", "pSubscribe");

    }




    static propertyEventAuto(oItem: CTF.ItransformItemInfo) {
        this.checkEventFull(oItem, "press", "onPress", "{(event)=>{", "}}", "");
        this.checkEventFull(oItem, "link", "onPress", "{(event)=>{top_support.pageNav(", ",this)}}", "'");

        this.checkEventFull(oItem, "value-change", "onValueChange", "{(item)=>{", "}}", "");
    }



    static VueEventAuto(oItem: CTF.ItransformItemInfo) {
        this.checkEventFull(oItem, "press", "onClick", "", "", "");
        this.checkEventFull(oItem, "link", CommonRoot.upProperty().vueBind + "href", "'javascript:top_support.pageNav(\\''+", "+'\\',this)'", "'");

        this.checkEventFull(oItem, "value-change", "onValueChange", "{(item)=>{", "}}", "");
    }






    static VuePropFormat(sVal: string) {
        return sVal.replace('@', '').replace(/\\{/, '').replace(/\\}/, '');
    }


    static checkForm(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {



    }





}



export class ItemSupportReact extends MprocessItem {
    static checkStyle(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        this.zeroFieldCheck(oItem, sSource, sTarget, CommonRoot.upProperty().dataAttrStyle, "{styles.", "}", "");

    }

    static checkForm(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        this.checkPropWithQuotes(oItem, sSource, sTarget);

    }

}


export class ItemSupportVue extends MprocessItem {

    static VueFormAuto(oItem: CTF.ItransformItemInfo) {

        let sFieldName = oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr);

        if (oItem.targetAttr.has(CommonRoot.upProperty().formBaseAttr)) {

            oItem.targetAttr.set("v-model", 'vdata_form.' + sFieldName);
        }


        if (oItem.sourceAttr.has(CommonRoot.upProperty().formBaseAttr)) {
            oItem.formField.fieldName = oItem.sourceAttr.get(CommonRoot.upProperty().formBaseAttr);
            oItem.formField.fieldType = oItem.sourceName;
        }



    }


    /**
   * 使用引号修改属性
   */
    static checkForm(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        this.checkPropWithEmpty(oItem, sSource,  'pform_' + sTarget);

    }


    static checkStyle(oItem: CTF.ItransformItemInfo, sSource: string, sTarget: string) {

        //this.checkPropWithEmpty(oItem, sSource,  'pstyle_' + sTarget);

       this.zeroFieldCheck(oItem, sSource,  'pstyle_' + sTarget, CommonRoot.upProperty().dataAttrStyle, "", "", "");

    }

}








