"use strict";
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "text", "value");
        var macroName = processItem.upPropValue(oItem, 'macro');
        oItem.sourceContent = "<" + macroName + " v-for=\"(item, index) in list_data\"\n        v-bind:item=\"item\"\n        v-bind:index=\"index\"\n        v-bind:key=\"item.id\"></" + macroName + ">";
        var listSource = processItem.upPropValue(oItem, 'list-source');
        oItem.readScript = listSource + ".then((data)=>{_self.list_data=data;})";
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
