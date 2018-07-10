"use strict";
var CommonRoot = require("../../base/common/root");
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = /** @class */ (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        var macroName = item_support_1.ItemSupportReact.upPropValue(oItem, 'macro');
        item_support_1.ItemSupportReact.propertyBaseAuto(oItem);
        item_support_1.ItemSupportReact.styleBaseAuto(oItem);
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
        item_support_1.ItemSupportReact.checkPropFull(oItem, "list-source", "plusListSource", "{(data)=>{return ", "}}", "");
        item_support_1.ItemSupportReact.checkPropWithQuotes(oItem, "macro", "plusMacroName");
        item_support_1.ItemSupportReact.checkEventFull(oItem, "end-reached", "onEndReached", "{(info)=>{", "}}", "");
        item_support_1.ItemSupportReact.checkPropWithBrace(oItem, "threshold", "onEndReachedThreshold");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
