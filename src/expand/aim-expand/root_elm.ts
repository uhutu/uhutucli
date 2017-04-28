import * as CTF from "../../project/aim-project/aim_parse";
import CommonRoot = require("../../base/common/root");
import processItem = require("../../project/support-operate/item_support");



export class RootExpandReactElm {


    textInput(oItem: CTF.ItransformItemInfo) {


        processItem.checkPropWithQuotes(oItem,"placeholder","placeholder");
        processItem.checkPropWithBrace(oItem,"secure","secureTextEntry");
        processItem.checkPropWithQuotes(oItem,"keyboard","keyboardType");

        processItem.checkPropWithBrace(oItem,"multiline","multiline");

        processItem.checkPropWithQuotes(oItem,"placeholder-color","placeholderTextColor");

        processItem.checkPropWithBrace(oItem,"form-max-size","maxLength");

        processItem.checkEventFull(oItem, "change-text", "onChangeText", "{(text)=>{", "}}", "");

        oItem.targetAttr.set('underlineColorAndroid','"transparent"');
        oItem.targetAttr.set('autoCapitalize','"none"');

        return oItem;
    }
    


}