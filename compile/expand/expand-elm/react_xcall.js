"use strict";
var CommonRoot = require("../../base/common/root");
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");
        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");
        //let macroName = processItem.upXaryValue(oItem, 'macro');
        oItem.sourceContent = '{this.' + CommonRoot.upProperty().templateXname + 'render_' + processItem.upXaryValue(oItem, 'macro') + '(' + processItem.upXaryValue(oItem, 'source') + ')}';
        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
