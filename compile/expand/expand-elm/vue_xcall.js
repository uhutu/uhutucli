"use strict";
var CommonRoot = require("../../base/common/root");
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = /** @class */ (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        oItem.elmName = item_support_1.ItemSupportVue.upXaryValue(oItem, 'macro');
        item_support_1.ItemSupportVue.checkXaryFull(oItem, 'source', CommonRoot.upProperty().vueBind + 'item', '', '', '');
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
