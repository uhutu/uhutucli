"use strict";
var beautify = require("beautify");
var utilsIo = require("./io");
var MutilsJson = (function () {
    function MutilsJson() {
    }
    MutilsJson.prototype.saveJsonFile = function (sPath, oJson) {
        utilsIo.writeFile(sPath, beautify(JSON.stringify(oJson), { format: 'json' }));
    };
    MutilsJson.prototype.stringify = function (oJson) {
        return JSON.stringify(oJson);
    };
    MutilsJson.prototype.parse = function (sJson) {
        return JSON.parse(sJson);
    };
    return MutilsJson;
}());
module.exports = new MutilsJson();
