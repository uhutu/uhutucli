"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MprocessParseFile = (function () {
    function MprocessParseFile() {
    }
    return MprocessParseFile;
}());
exports.MprocessParseFile = MprocessParseFile;
var MtransformPageOut = (function () {
    function MtransformPageOut() {
        this.content = [];
    }
    return MtransformPageOut;
}());
exports.MtransformPageOut = MtransformPageOut;
var MbasePageConfig = (function () {
    function MbasePageConfig() {
        this.pageTitle = "";
        this.masterPath = "";
        this.tplFile = "tpl/default.ejs";
        this.scriptInit = "";
    }
    return MbasePageConfig;
}());
exports.MbasePageConfig = MbasePageConfig;
/**
 * 转换帮助类
 */
var MtransformParseHelper = (function () {
    function MtransformParseHelper() {
    }
    /**
     * 获取基本元素的转换处理定义
     */
    MtransformParseHelper.prototype.upBaseElm = function (oTransform, oItem) {
        if (oItem.sourceName in oTransform.mould.elms) {
            var tp = oTransform.mould.elms[oItem.sourceName];
            return tp;
        }
        else {
            return null;
        }
    };
    return MtransformParseHelper;
}());
exports.MtransformParseHelper = MtransformParseHelper;
