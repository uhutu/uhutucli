"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var ParseSupport = require("../../project/support-operate/parse_support");
var ReactParse = require("../../project/process-app/react_parse");
var VueParse = require("../../project/process-app/vue_parse");
var WeappParse = require("../../project/process-app/weapp_parse");
var ejs = require("ejs");
var Mexport = /** @class */ (function () {
    function Mexport() {
    }
    Mexport.prototype.contentParse = function (oLocalConfig, oParseFile) {
        var sReturn = null;
        var oOutContent = null;
        var oTrans = null;
        var oApp = null;
        if (oParseFile.parseType === "react") {
            oTrans = ReactParse;
            oApp = oLocalConfig.appReact;
        }
        else if (oParseFile.parseType === "vue") {
            oTrans = VueParse;
            oApp = oLocalConfig.appVue;
        }
        else if (oParseFile.parseType === "weapp") {
            oTrans = WeappParse;
            oApp = oLocalConfig.appWeapp;
        }
        oTrans.mould = CommonUtil.utilsJson.parse(CommonUtil.utilsIo.readFile(oApp.mouldPath));
        oTrans.pageConfig.masterPath = oLocalConfig.define.devPath + "/master/" + oApp.appType;
        oOutContent = ParseSupport.parseHtml(oLocalConfig, oTrans, oParseFile);
        if (oOutContent != null) {
            //如果输出的页面配置不存在  则加载默认配置项
            if (!oOutContent.pageConfig) {
                oOutContent.pageConfig = oTrans.pageConfig;
            }
            var sTemplate = CommonUtil.utilsIo.readFile(CommonUtil.utilsIo.pathJoin(oOutContent.pageConfig.masterPath, oOutContent.pageConfig.tplFile));
            try {
                var sOut = ejs.render(sTemplate, { out: oOutContent });
            }
            catch (e) {
                console.warn(e);
            }
            sReturn = sOut;
        }
        else {
            CommonRoot.logError(931612001, [oParseFile.parseType, oParseFile.fileBasename]);
        }
        return sReturn;
    };
    return Mexport;
}());
module.exports = new Mexport();
