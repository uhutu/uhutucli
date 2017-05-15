"use strict";
var processItem = require("../../project/support-operate/item_support");
var MreactFbase = (function () {
    function MreactFbase() {
    }
    MreactFbase.prototype.expandOpen = function (oItem) {
        processItem.formBaseAuto(oItem);
        processItem.styleBaseAuto(oItem);
        return oItem;
    };
    return MreactFbase;
}());
module.exports = new MreactFbase();
