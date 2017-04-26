"use strict";
var CommonRoot = require("../../base/common/root");
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");
        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");
        var macroName = processItem.upPropValue(oItem, 'macro');
        oItem.targetAttr.set('renderItem', '{({item}) => this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '(item)}');
        oItem.targetAttr.set('data', '{this.state.' + CommonRoot.upProperty().templateXname + 'data_' + macroName + "}");
        var sRefreshScript = processItem.upEventValue(oItem, 'refresh');
        if (sRefreshScript) {
            oItem.targetAttr.set('refreshing', '{false}');
            oItem.targetAttr.set('onRefresh', '{()=>{this.setState({' + CommonRoot.upProperty().templateXname + 'data_' + macroName + ':' + sRefreshScript + '});}}');
        }
        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
