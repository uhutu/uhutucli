"use strict";
var CommonRoot = require("../../base/common/root");
var item_support_1 = require("../../project/support-operate/item_support");
var MexpandReactUicon = /** @class */ (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "text", "value");
        var macroName = item_support_1.ItemSupportVue.upPropValue(oItem, 'macro');
        oItem.sourceContent = "<" + macroName + " v-for=\"(item, index) in vdata_list\"\n        " + CommonRoot.upProperty().vueBind + "item=\"item\"\n        " + CommonRoot.upProperty().vueBind + "index=\"index\"\n        " + CommonRoot.upProperty().vueBind + "key=\"item.id\"></" + macroName + ">";
        var listSource = item_support_1.ItemSupportVue.upPropValue(oItem, 'list-source');
        oItem.readScript = listSource + ".then((data)=>{ baby_support.dataShowListPage(_self,data)})";
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
