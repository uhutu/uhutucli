"use strict";
var CommonRoot = require("../../base/common/root");
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = /** @class */ (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        var sFontName = item_support_1.ItemSupportVue.VuePropFormat(item_support_1.ItemSupportVue.upPropValue(oItem, 'name'));
        var sFontFamily = 'material';
        if (item_support_1.ItemSupportVue.upPropValue(oItem, 'family')) {
            sFontFamily = item_support_1.ItemSupportVue.VuePropFormat(item_support_1.ItemSupportVue.upPropValue(oItem, 'family'));
        }
        if (sFontName.indexOf('#') > -1) {
            oItem.targetAttr.set(CommonRoot.upProperty().vueBind + 'class', '\'font_\'+' + sFontFamily + '+\' font_\'+' + sFontFamily + '+\'_\'+' + sFontName);
        }
        else {
            var sClass = oItem.targetAttr.get('class');
            if (!sClass) {
                sClass = '';
            }
            oItem.targetAttr.set('class', sClass + ' ' + 'font_' + sFontFamily + ' font_' + sFontFamily + '_' + sFontName);
        }
        var sColor = item_support_1.ItemSupportVue.upPropValue(oItem, "color");
        if (sColor) {
            oItem.targetAttr.set(CommonRoot.upProperty().vueBind + 'style', "'color:'+" + sColor);
        }
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
