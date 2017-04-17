"use strict";
var CommonUtil = require("../../base/common/util");
var ejs = require("ejs");
var CfileInfo = (function () {
    function CfileInfo() {
    }
    return CfileInfo;
}());
var SimpleReact = (function () {
    function SimpleReact() {
    }
    SimpleReact.prototype.exec = function (oLocalConfig, oPlugin, oSet) {
        var sPagesPath = CommonUtil.utilsIo.pathJoin(oLocalConfig.define.devPath, "pages");
        var aFiles = CommonUtil.utilsIo.listDir(sPagesPath);
        var aNewName = [];
        aFiles.forEach(function (sName) {
            var cFile = new CfileInfo();
            var sExt = CommonUtil.utilsIo.upExtName(sName);
            if (sExt === '.html') {
                cFile.filePath = 'pages' + sName.replace(sPagesPath, '').replace(sExt, '');
                cFile.uqName = CommonUtil.utilsString.replaceAll(cFile.filePath, CommonUtil.utilsIo.upPathSeq(), "_");
                cFile.importName = "import " + cFile.uqName + " from '../../../" + cFile.filePath + "';";
                cFile.screenName = cFile.uqName + ":{screen:" + cFile.uqName + "},";
                aNewName.push(cFile);
            }
        });
        var aImport = [];
        var aScreen = [];
        aNewName.forEach(function (cFile) {
            aImport.push(cFile.importName);
            aScreen.push(cFile.screenName);
        });
        var sContent = CommonUtil.utilsIo.readFile(oSet.filePath);
        var oSource = CommonUtil.utilsJson.readJsonFile(oSet.sourcePath);
        try {
            sContent = ejs.render(sContent, { out: oSource });
        }
        catch (e) {
            console.warn(e);
        }
        CommonUtil.utilsIo.writeFile(oSet.extendAfield, aImport.join(CommonUtil.utilsIo.upRowSeq()));
        CommonUtil.utilsIo.writeFile(oSet.extendBfield, aScreen.join(CommonUtil.utilsIo.upRowSeq()));
        CommonUtil.utilsIo.writeFile(oSet.targetPath, sContent);
        //console.log(aNewName);
        return true;
    };
    return SimpleReact;
}());
module.exports = new SimpleReact();
