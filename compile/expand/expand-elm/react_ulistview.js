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
        oItem.targetAttr.set('renderRow', '{this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '.bind(this)}');
        oItem.targetAttr.set('dataSource', '{this.state.' + CommonRoot.upProperty().templateXname + 'data_' + macroName + "}");
        oItem.targetAttr.set('enableEmptySections', '{true}');
        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
