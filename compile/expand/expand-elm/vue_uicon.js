"use strict";
var CommonRoot = require("../../base/common/root");
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        var sFontName = processItem.VuePropFormat(processItem.upPropValue(oItem, 'name'));
        var sFontFamily = '';
        if (processItem.upPropValue(oItem, 'family')) {
            sFontFamily = processItem.VuePropFormat(processItem.upPropValue(oItem, 'family'));
        }
        if (sFontName.indexOf('#') > -1) {
            oItem.targetAttr.set(CommonRoot.upProperty().vueBind + 'class', '\'font_\'+' + sFontFamily + '+\' font_\'+' + sFontFamily + '+\'_\'+' + sFontName);
        }
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
