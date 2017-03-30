"use strict";
var AimParse = require("../../project/aim-project/aim_parse");
var Mexport = (function () {
    function Mexport() {
    }
    Mexport.prototype.parseHtml = function (oLocalConfig, oParseWork) {
        var oPageOut = new AimParse.MtransformPageOut();
        return oPageOut;
    };
    return Mexport;
}());
module.exports = new Mexport();
