"use strict";
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var LoadConfig = require("../../cli/exec-load/load_config");
var PlugProcess = (function () {
    function PlugProcess() {
    }
    /**
     * react添加内容
     * @param oLocalConfig
     * @param oPlugin
     * @param oSet
     */
    PlugProcess.prototype.reactAddLink = function (oLocalConfig, oPlugin, oSet) {
        var oPackage = CommonUtil.utilsIo.upConfigByFile(oLocalConfig.file.reactPackage);
        if (!oPackage.links.hasOwnProperty(oPlugin.name)) {
            CommonUtil.utilsHelper.spawnSync('react-native', ['link', oPlugin.name], { cwd: oLocalConfig.appReact.workPath });
            oPackage.links[oPlugin.name] = oPlugin.version;
            CommonUtil.utilsJson.saveJsonFile(oLocalConfig.file.reactPackage, oPackage);
        }
    };
    /**
     * ios项目初始化pod
     * @param oLocalConfig
     * @param oPlugin
     * @param oSet
     */
    PlugProcess.prototype.iosInitPod = function (oLocalConfig, oPlugin, oSet) {
        var sPodFilePath = CommonUtil.utilsIo.pathJoin(oLocalConfig.appReact.workPath, "ios", "Podfile");
        if (!CommonUtil.utilsIo.flagExist(sPodFilePath)) {
            CommonUtil.utilsHelper.spawnSync("pod", ['init'], { cwd: CommonUtil.utilsIo.pathJoin(oLocalConfig.appReact.workPath, "ios") });
        }
        var bFlagInstall = false;
        if (oSet.contentInfo.length > 0) {
            var sContent = CommonUtil.utilsIo.readFile(sPodFilePath);
            var sNewContent = CommonUtil.utilsString.reaplaceBig(sContent, CommonUtil.utilsIo.upRowSeq() + CommonRoot.upNoteMessage(1, oSet.name, 2), CommonRoot.upNoteMessage(2, oSet.name, 2), CommonUtil.utilsIo.upRowSeq() + oSet.contentInfo.join(CommonUtil.utilsIo.upRowSeq()) + CommonUtil.utilsIo.upRowSeq(), "target '" + oLocalConfig.appReact.workName + "' do");
            if (sContent != sNewContent) {
                CommonUtil.utilsIo.writeFile(sPodFilePath, sNewContent);
                bFlagInstall = true;
            }
        }
        if (bFlagInstall) {
            CommonUtil.utilsHelper.spawnSync("pod", ['install'], { cwd: CommonUtil.utilsIo.pathJoin(oLocalConfig.appReact.workPath, "ios") });
        }
    };
    /**
     * ios修改配置项
     * @param oLocalConfig
     * @param oPlugin
     * @param oSet
     */
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
        CommonUtil.utilsXml.saveXmlFile(doc, oLocalConfig.file.reactIosInfoPlist);
    };
    /**
     * android项目修改配置项
     * @param oLocalConfig
     * @param oPlugin
     * @param oSet
     */
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
    /**
     * 日志描述输出
     * @param oLocalConfig
     * @param oPlugin
     * @param oSet
     */
    PlugProcess.prototype.baseLogDescript = function (oLocalConfig, oPlugin, oSet) {
        //日志编号  如果未定义则不输出
        var sLogType = oSet.optType;
        if (sLogType != undefined) {
            if (oSet.desc) {
                CommonRoot.logAuto(oSet.optType, oSet.desc);
            }
        }
    };
    /**
     * 文本内容替换
     * @param oLocalConfig
     * @param oPlugin
     * @param oSet
     */
    PlugProcess.prototype.baseContentReplace = function (oLocalConfig, oPlugin, oSet) {
        var sAfterText = '';
        if (oSet.withText != undefined) {
            sAfterText = oSet.withText;
        }
        else {
            sAfterText = oSet.contentInfo.join(CommonUtil.utilsIo.upRowSeq());
        }
        //判断如果replaceText字段为空 则直接写入
        if (CommonUtil.utilsString.isEmpty(oSet.replaceText)) {
            CommonUtil.utilsIo.writeFile(oSet.filePath, sAfterText);
        }
        else {
            CommonUtil.utilsIo.contentReplaceWith(oSet.filePath, oSet.replaceText, oSet.withText);
        }
    };
    /**
     * 文件操作
     *
     * @param {AimLocal.IAimLocalConfig} oLocalConfig
     * @param {AimLocal.IAimLocalNexusPlugDefine} oPlugin
     * @param {AimLocal.IAimLocalPlugSet} oSet
     *
     * @memberOf PlugProcess
     */
    PlugProcess.prototype.baseFileOption = function (oLocalConfig, oPlugin, oSet) {
        if (oSet.optType != undefined) {
            switch (oSet.optType) {
                case 3:
                    CommonUtil.utilsIo.copyFileAsync(oSet.key, oSet.value);
                    break;
            }
        }
    };
    /**
     * 设置文件内容并进行替换操作
     *
     * @param {AimLocal.IAimLocalConfig} oLocalConfig
     * @param {AimLocal.IAimLocalNexusPlugDefine} oPlugin
     * @param {AimLocal.IAimLocalPlugSet} oSet
     * 其中：name 调换标记 noteType注释类型
     *
     * @memberOf PlugProcess
     */
    PlugProcess.prototype.baseFileContent = function (oLocalConfig, oPlugin, oSet) {
        //CommonUtil.utilsIo.writeFile(oSet.filePath, oSet.contentInfo.join(''));
        if (oSet.contentInfo.length > 0) {
            if (!CommonUtil.utilsIo.flagExist(oSet.filePath)) {
                CommonUtil.utilsIo.writeFile(oSet.filePath, '');
            }
            var sContent = CommonUtil.utilsIo.readFile(oSet.filePath);
            var sNewContent = CommonUtil.utilsString.reaplaceBig(sContent, CommonUtil.utilsIo.upRowSeq() + CommonRoot.upNoteMessage(1, oSet.name, oSet.noteType), CommonRoot.upNoteMessage(2, oSet.name, oSet.noteType), CommonUtil.utilsIo.upRowSeq() + oSet.contentInfo.join(CommonUtil.utilsIo.upRowSeq()) + CommonUtil.utilsIo.upRowSeq(), "");
            if (sContent != sNewContent) {
                CommonUtil.utilsIo.writeFile(oSet.filePath, sNewContent);
            }
        }
    };
    return PlugProcess;
}());
var MloadPlug = (function () {
    function MloadPlug() {
    }
    MloadPlug.prototype.refreshPlug = function (oLocalConfig, oApp, oPlug) {
        var sFileContent = CommonUtil.utilsIo.readFile(oApp.plugInfo);
        sFileContent = LoadConfig.formatConfigString(sFileContent, oLocalConfig);
        return CommonUtil.utilsHelper.deepAssign(CommonUtil.utilsJson.parse(sFileContent), oPlug);
    };
    MloadPlug.prototype.processPlus = function (oLocalConfig, oPlugConfig, aStep) {
        var oProcess = new PlugProcess();
        var _loop_1 = function () {
            var oPlug = oPlugConfig[p];
            if (!oPlug.disable) {
                if (oPlug.hasOwnProperty('json')) {
                    sFileContent = CommonUtil.utilsIo.readFile(oPlug.json);
                    sFileContent = LoadConfig.formatConfigString(sFileContent, oLocalConfig);
                    oJsonConfig = JSON.parse(sFileContent);
                    aStep.forEach(function (sStep) {
                        if (oJsonConfig.hasOwnProperty(sStep)) {
                            var aJsonStep = oJsonConfig[sStep];
                            aJsonStep.forEach(function (oCurrent) {
                                if (oProcess[oCurrent.exec]) {
                                    CommonRoot.logDebug(970312004, [oPlug.name, oCurrent.exec]);
                                    oProcess[oCurrent.exec](oLocalConfig, oPlug, oCurrent.set);
                                }
                                else {
                                    CommonRoot.logError(930312003, oCurrent.exec);
                                }
                            });
                        }
                    });
                }
            }
        };
        var sFileContent, oJsonConfig;
        for (var p in oPlugConfig) {
            _loop_1();
        }
    };
    return MloadPlug;
}());
module.exports = new MloadPlug();
