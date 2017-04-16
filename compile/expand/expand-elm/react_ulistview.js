"use strict";
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        //processItem.checkPropWithEmpty(oItem, "data-source", "dataSource");
        //processItem.checkPropFull(oItem, "template", "renderRow", "this.template_", ".bind(this)");
        oItem.targetAttr.set('renderRow', 'this.template_' + oItem.sourceAttr.get('template') + '.bind(this)');
        oItem.targetAttr.set('dataSource', 'this.state.template_data_source_' + oItem.sourceAttr.get('template'));
        oItem.targetAttr.set('enableEmptySections', 'true');
        //processItem.checkEventFull(oItem, "change-text", "onChangeText", "(text)=>{", "}");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
