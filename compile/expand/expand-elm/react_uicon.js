"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var processItem = require("../../project/support-operate/item_support");
var root_elm_1 = require("../../expand/aim-expand/root_elm");
var MexpandReactUicon = (function (_super) {
    __extends(MexpandReactUicon, _super);
    function MexpandReactUicon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        processItem.checkPropWithQuotes(oItem, "name", "name");
        processItem.checkPropWithEmpty(oItem, "size", "size");
        processItem.checkPropWithQuotes(oItem, "color", "color");
        processItem.checkPropWithQuotes(oItem, "reverse", "reverse");
        return oItem;
    };
    return MexpandReactUicon;
}(root_elm_1.RootExpandElm));
module.exports = new MexpandReactUicon();
