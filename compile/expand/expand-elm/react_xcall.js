"use strict";
var CommonRoot = require("../../base/common/root");
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");
        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");
        //let macroName = processItem.upXaryValue(oItem, 'macro');
        oItem.sourceContent = '{this.' + CommonRoot.upProperty().templateXname + 'render_' + item_support_1.ItemSupportReact.upXaryValue(oItem, 'macro') + '(' + item_support_1.ItemSupportReact.upXaryValue(oItem, 'source') + ')}';
        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
