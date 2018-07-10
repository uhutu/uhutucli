"use strict";
var beautify = require("beautify");
var utilsIo = require("./io");
var MutilsJson = /** @class */ (function () {
    function MutilsJson() {
    }
    MutilsJson.prototype.saveJsonFile = function (sPath, oJson) {
        utilsIo.writeFile(sPath, beautify(JSON.stringify(oJson), { format: 'json' }));
    };
    /**
     * 从json文件中读取配置
     *
     * @param {string} sPath
     * @returns {*}
     *
     * @memberOf MutilsJson
     */
    MutilsJson.prototype.readJsonFile = function (sPath) {
        return JSON.parse(utilsIo.readFile(sPath));
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
