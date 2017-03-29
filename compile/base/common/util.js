"use strict";
var UtilsString = require("../../base/utils/string");
var UtilsJson = require("../../base/utils/json");
var UtilsHelper = require("../../base/utils/helper");
var UtilsIo = require("../../base/utils/io");
var UtilsObject = require("../../base/utils/object");
var UtilsXml = require("../../base/utils/xml");
var McommonUtil = (function () {
    function McommonUtil() {
        this.utilsString = UtilsString;
        this.utilsIo = UtilsIo;
        this.utilsJson = UtilsJson;
        this.utilsHelper = UtilsHelper;
        this.utilsObject = UtilsObject;
        this.utilsXml = UtilsXml;
    }
    return McommonUtil;
}());
module.exports = new McommonUtil();
