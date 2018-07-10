"use strict";
var root_elm_1 = require("../../expand/aim-expand/root_elm");
var MexpandReactUicon = /** @class */ (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        new root_elm_1.RootExpandReactElm().textInput(oItem);
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
