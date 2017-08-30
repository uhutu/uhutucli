"use strict";
var item_support_1 = require("../../project/support-operate/item_support");
var MreactFbase = (function () {
    function MreactFbase() {
    }
    MreactFbase.prototype.expandOpen = function (oItem) {
        item_support_1.ItemSupportReact.propertyBaseAuto(oItem);
        item_support_1.ItemSupportReact.formBaseAuto(oItem);
        item_support_1.ItemSupportReact.styleBaseAuto(oItem);
        return oItem;
    };
    return MreactFbase;
}());
module.exports = new MreactFbase();
