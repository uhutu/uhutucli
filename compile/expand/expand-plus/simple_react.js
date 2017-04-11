"use strict";
var CommonUtil = require("../../base/common/util");
var SimpleReact = (function () {
    function SimpleReact() {
    }
    SimpleReact.prototype.exec = function (oLocalConfig, oPlugin, oSet) {
        var sPagesPath = CommonUtil.utilsIo.pathJoin(oLocalConfig.define.devPath, "pages");
        var aFiles = CommonUtil.utilsIo.listDir(sPagesPath);
        var aNewName = [];
        aFiles.forEach(function (sName) {
            var sExt = CommonUtil.utilsIo.upExtName(sName);
            if (sExt === '.html') {
                sName = 'pages' + sName.replace(sPagesPath, '').replace(sExt, '');
                aNewName.push(CommonUtil.utilsString.replaceAll(sName, CommonUtil.utilsIo.upPathSeq(), "_"));
            }
        });
        console.log(aNewName);
        return true;
    };
    return SimpleReact;
}());
module.exports = new SimpleReact();
