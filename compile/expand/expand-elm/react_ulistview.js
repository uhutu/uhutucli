"use strict";
var CommonRoot = require("../../base/common/root");
var processItem = require("../../project/support-operate/item_support");
var MexpandReactUicon = (function () {
    function MexpandReactUicon() {
    }
    MexpandReactUicon.prototype.expandOpen = function (oItem) {
        var macroName = processItem.upPropValue(oItem, 'macro');
        /*
        oItem.targetAttr.set('renderRow', '{this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '.bind(this)}');

        oItem.targetAttr.set('dataSource', '{this.state.' + CommonRoot.upProperty().templateXname + 'data_' + macroName + "}");

        oItem.targetAttr.set('enableEmptySections', '{true}');

        

        let sRefreshScript = processItem.upEventValue(oItem, 'refresh');

        if (sRefreshScript) {

            let aStr = '{<RefreshControl refreshing={false} onRefresh={()=>{' + sRefreshScript + '}} />}';

            oItem.targetAttr.set('refreshControl', aStr);


        }

        processItem.checkEventFull(oItem, "end-reached", "onEndReached", "{(info)=>{", "}}", "");
        processItem.checkPropWithBrace(oItem, "threshold", "onEndReachedThreshold");
        */
        oItem.targetAttr.set('renderRow', '{this.' + CommonRoot.upProperty().templateXname + 'render_' + macroName + '.bind(this)}');
        processItem.checkPropFull(oItem, "list-source", "plusListSource", "{(data)=>{return ", "}}", "");
        processItem.checkPropWithQuotes(oItem, "macro", "plusMacroName");
        return oItem;
    };
    return MexpandReactUicon;
}());
module.exports = new MexpandReactUicon();
