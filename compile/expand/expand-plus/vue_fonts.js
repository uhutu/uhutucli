"use strict";
var CommonUtil = require("../../base/common/util");
var VueFonts = /** @class */ (function () {
    function VueFonts() {
    }
    VueFonts.prototype.exec = function (oLocalConfig, oPlugin, oSet) {
        var sParseFile = oSet.contentInfo.join('');
        var aFontConfig = JSON.parse(sParseFile);
        var sPath = oLocalConfig.appReact.workPath + '/node_modules/react-native-vector-icons';
        if (CommonUtil.utilsIo.flagExist(sPath)) {
            var aMaps = CommonUtil.utilsIo.listDir(sPath + '/glyphmaps');
            var aCssContent_1 = [];
            aMaps.forEach(function (oItem) {
                aFontConfig.forEach(function (element) {
                    if (oItem.endsWith(element.file + '.json')) {
                        aCssContent_1.push("@font-face {font-family: " + element.name + ";src:url('fonts/" + element.file + ".ttf');}");
                        aCssContent_1.push(".font_" + element.name + "{font-family:'" + element.name + "';font-style: normal;}");
                        var oJson = CommonUtil.utilsJson.readJsonFile(oItem);
                        for (var p in oJson) {
                            var oVal = oJson[p];
                            aCssContent_1.push('.font_' + element.name + '_' + p + ':before{content:\'\\' + oVal.toString(16) + '\';}');
                        }
                    }
                });
            });
            if (aCssContent_1.length > 0) {
                CommonUtil.utilsIo.writeFile(oSet.filePath, aCssContent_1.join(CommonUtil.utilsIo.upRowSeq()));
            }
            var aFonts = CommonUtil.utilsIo.listDir(sPath + '/Fonts');
            aFonts.forEach(function (oItem) {
                aFontConfig.forEach(function (element) {
                    if (oItem.endsWith(element.file + '.ttf')) {
                        CommonUtil.utilsIo.copyFileAsync(oItem, oSet.targetPath + '/' + element.file + '.ttf');
                    }
                });
            });
        }
        return true;
    };
    return VueFonts;
}());
module.exports = new VueFonts();
