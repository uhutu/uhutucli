"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        oItem.elmName = processItem.upXaryValue(oItem, 'macro');
        processItem.checkXaryFull(oItem, 'source', 'v-bind:item', '"', '"', '');
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
