"use strict";
var xpath = require("xpath");
var xmldom = require("xmldom");
var beautify = require("beautify");
var utilsIo = require("./io");
var M = {
    parseFromFile: function (sPath) {
        var dom = xmldom.DOMParser;
        var sStr = utilsIo.readFile(sPath);
        var doc = new dom().parseFromString(sStr);
        return doc;
    },
    upXpathUseAndroid: function () {
        return xpath.useNamespaces({ "android": "http://schemas.android.com/apk/res/android" });
    },
    upXpath: function () {
        return xpath;
    },
    saveXmlFile: function (doc, sPath) {
        utilsIo.writeFile(sPath, beautify(doc.toString(), { format: 'xml' }));
    }
};
module.exports = M;
