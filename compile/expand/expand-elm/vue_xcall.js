"use strict";
var CommonRoot = require("../../base/common/root");
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        oItem.elmName = processItem.upXaryValue(oItem, 'macro');
        processItem.checkXaryFull(oItem, 'source', CommonRoot.upProperty().vueBind + 'item', '', '', '');
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
