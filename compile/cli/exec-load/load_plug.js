"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var LoadConfig = require("../../cli/exec-load/load_config");
var PlugProcess = (function () {
    function PlugProcess() {
    }
    PlugProcess.prototype.reactAddLink = function (oLocalConfig, oPlugin, oSet) {
        var oPackage = CommonUtil.utilsIo.upConfigByFile(oLocalConfig.file.reactPackage);
        if (!oPackage.links.hasOwnProperty(oPlugin.name)) {
            CommonUtil.utilsHelper.spawnSync('react-native', ['link', oPlugin.name], { cwd: oLocalConfig.appReact.workPath });
            oPackage.links[oPlugin.name] = oPlugin.version;
            CommonUtil.utilsJson.saveJsonFile(oLocalConfig.file.reactPackage, oPackage);
        }
    };
    PlugProcess.prototype.iosAddPlist = function (oLocalConfig, oPlugin, oSet) {
        var doc = CommonUtil.utilsXml.parseFromFile(oLocalConfig.file.reactIosInfoPlist);
        var select = CommonUtil.utilsXml.upXpathUseAndroid();
        var dict = select("//plist/dict", doc)[0];
        var sKey = select("key[text()=\"" + oSet.key + "\"]", dict);
        if (sKey.length > 0) {
            var eExitStr = select("key[text()=\"" + oSet.key + "\"]/following-sibling::string[1]", dict)[0];
            doc.removeChild(eExitStr);
            doc.removeChild(sKey[0]);
        }
        var eMeta = doc.createElement('key');
        eMeta.textContent = oSet.key;
        dict.appendChild(eMeta);
        var eString = doc.createElement('string');
        eString.textContent = oSet.value;
        dict.appendChild(eString);
        //console.log(doc.toString());
        CommonUtil.utilsXml.saveXmlFile(doc, oLocalConfig.file.reactIosInfoPlist);
    };
    PlugProcess.prototype.androidAddStrings = function (oLocalConfig, oPlugin, oSet) {
        var doc = CommonUtil.utilsXml.parseFromFile(oLocalConfig.file.reactAndroidStringXml);
        var select = CommonUtil.utilsXml.upXpathUseAndroid();
        var dict = select("//resources", doc)[0];
        var sKey = select(oSet.key + "[@name=\"" + oSet.name + "\"]", dict);
        if (sKey.length > 0) {
            doc.removeChild(sKey[0]);
        }
        var eMeta = doc.createElement(oSet.key);
        eMeta.textContent = oSet.value;
        if (oSet.hasOwnProperty("attr") && oSet.attr.length > 0) {
            oSet.attr.forEach(function (f) {
                eMeta.setAttribute(f.key, f.value);
            });
        }
        eMeta.setAttribute("name", oSet.name);
        dict.appendChild(eMeta);
        CommonUtil.utilsXml.saveXmlFile(doc, oLocalConfig.file.reactAndroidStringXml);
    };
    PlugProcess.prototype.baseContentReplace = function (oLocalConfig, oPlugin, oSet) {
        CommonUtil.utilsIo.contentReplaceWith(oSet.filePath, oSet.replaceText, oSet.withText);
    };
    return PlugProcess;
}());
var Mexport = (function () {
    function Mexport() {
    }
    Mexport.prototype.processPlus = function (oLocalConfig, aStep) {
        var oProcess = new PlugProcess();
        for (var p in oLocalConfig.plugs) {
            var oPlug = oLocalConfig.plugs[p];
            if (oPlug.hasOwnProperty('json')) {
                var sFileContent = CommonUtil.utilsIo.readFile(oPlug.json);
                sFileContent = LoadConfig.formatConfigString(sFileContent, oLocalConfig);
                var oJsonConfig = JSON.parse(sFileContent);
                aStep.forEach(function (sStep) {
                    if (oJsonConfig.hasOwnProperty(sStep)) {
                        var aJsonStep = oJsonConfig[sStep];
                        aJsonStep.forEach(function (oCurrent) {
                            if (oProcess[oCurrent.exec]) {
                                oProcess[oCurrent.exec](oLocalConfig, oPlug, oCurrent);
                            }
                            else {
                                CommonRoot.logError(932001003, oCurrent.exec);
                            }
                        });
                    }
                });
            }
        }
    };
    return Mexport;
}());
module.exports = new Mexport();
