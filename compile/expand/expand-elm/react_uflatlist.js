"use strict";
var CommonRoot = require("../../base/common/root");
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");
        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");
        var macroName = item_support_1.ItemSupportReact.upPropValue(oItem, 'macro');
        oItem.targetAttr.set('renderItem', '{({item}) => this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '(item)}');
        oItem.targetAttr.set('data', '{this.state.' + CommonRoot.upProperty().templateXname + 'data_' + macroName + "}");
        var sRefreshScript = item_support_1.ItemSupportReact.upEventValue(oItem, 'refresh');
        if (sRefreshScript) {
            oItem.targetAttr.set('refreshing', '{false}');
            oItem.targetAttr.set('onRefresh', '{()=>{' + sRefreshScript + '}}');
        }
        //let sEndScript = processItem.upEventValue(oItem, 'endReached');
        item_support_1.ItemSupportReact.checkEventFull(oItem, "end-reached", "onEndReached", "{(info)=>{", "}}", "");
        item_support_1.ItemSupportReact.checkPropWithBrace(oItem, "threshold", "onEndReachedThreshold");
        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
