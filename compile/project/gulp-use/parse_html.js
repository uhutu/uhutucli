"use strict";
var CommonRoot = require("../../base/common/root");
var ParseSupport = require("../../project/support-operate/parse_support");
var ReactParse = require("../../project/process-react/react_parse");
var Mexport = (function () {
    function Mexport() {
    }
    Mexport.prototype.contentParse = function (oLocalConfig, oParseFile) {
        var sReturn = null;
        var oOutContent = null;
        if (oParseFile.parseType === "react") {
            oOutContent = ParseSupport.parseHtml(oLocalConfig, ReactParse);
        }
        if (oOutContent != null) {
            sReturn = oOutContent.content.join('');
        }
        else {
            CommonRoot.logError(931612001, oParseFile.parseType, oParseFile.fileBasename);
        }
        return sReturn;
    };
    return Mexport;
}());
module.exports = new Mexport();
