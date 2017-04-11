import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";
import LoadConfig = require("../../cli/exec-load/load_config");

class PlugProcess {


    _logShow(oSet: AimLocal.IAimLocalPlugSet) {
        if (oSet.logCode != undefined) {
            CommonRoot.logAuto(oSet.logCode, oSet.logParams);
        }

    }


    /**
     * react添加内容
     * @param oLocalConfig 
     * @param oPlugin 
     * @param oSet 
     */
    reactAddLink(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {

        var oPackage = CommonUtil.utilsIo.upConfigByFile(oLocalConfig.file.reactPackage);
        if (!oPackage.links.hasOwnProperty(oPlugin.name)) {
            CommonUtil.utilsHelper.spawnSync('react-native', ['link', oPlugin.name], { cwd: oLocalConfig.appReact.workPath });
            oPackage.links[oPlugin.name] = oPlugin.version;
            CommonUtil.utilsJson.saveJsonFile(oLocalConfig.file.reactPackage, oPackage);
        }
        return true;

    }

    /**
     * ios项目初始化pod
     * @param oLocalConfig 
     * @param oPlugin 
     * @param oSet 
     */
    iosInitPod(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {

        let bFlagInstall = false;
        var sPodFilePath = CommonUtil.utilsIo.pathJoin(oLocalConfig.appReact.workPath, "ios", "Podfile");

        if (!CommonUtil.utilsIo.flagExist(sPodFilePath)) {
            CommonUtil.utilsHelper.spawnSync("pod", ['init'], { cwd: CommonUtil.utilsIo.pathJoin(oLocalConfig.appReact.workPath, "ios") });
        }
        else {
            //判断如果不存在Pods文件夹 则初始化之
            if (!CommonUtil.utilsIo.flagExist(CommonUtil.utilsIo.pathJoin(oLocalConfig.appReact.workPath, "ios", "Pods"))) {
                bFlagInstall = true;
            }
        }




        if (oSet.contentInfo.length > 0) {
            var sContent = CommonUtil.utilsIo.readFile(sPodFilePath);
            var sNewContent = CommonUtil.utilsString.reaplaceBig(sContent,
                CommonUtil.utilsIo.upRowSeq() + CommonRoot.upNoteMessage(1, oSet.name, 2),
                CommonRoot.upNoteMessage(2, oSet.name, 2),
                CommonUtil.utilsIo.upRowSeq() + oSet.contentInfo.join(CommonUtil.utilsIo.upRowSeq()) + CommonUtil.utilsIo.upRowSeq(),
                "target '" + oLocalConfig.appReact.workName + "' do");

            if (sContent != sNewContent) {
                CommonUtil.utilsIo.writeFile(sPodFilePath, sNewContent);

                bFlagInstall = true;
            }
        }
        if (bFlagInstall) {
            CommonUtil.utilsHelper.spawnSync("pod", ['install'], { cwd: CommonUtil.utilsIo.pathJoin(oLocalConfig.appReact.workPath, "ios") });
        }

        return true;
    }




    /**
     * ios修改配置项
     * @param oLocalConfig 
     * @param oPlugin 
     * @param oSet 
     */
    iosAddPlist(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {
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


        return true;
    }

    /**
     * android项目修改配置项
     * @param oLocalConfig 
     * @param oPlugin 
     * @param oSet 
     */
    androidAddStrings(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {
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

        return true;
    }

    /**
     * 日志描述输出
     * @param oLocalConfig 
     * @param oPlugin 
     * @param oSet 
     */
    baseLogDescript(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {

        //日志编号  如果未定义则不输出
        var sLogType = oSet.optType;

        if (sLogType != undefined) {

            if (oSet.desc) {
                CommonRoot.logAuto(oSet.optType, oSet.desc);
            }

        }

        return true;

    }

    /**
     * 文本内容替换
     * @param oLocalConfig 
     * @param oPlugin 
     * @param oSet 
     */
    baseContentReplace(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {

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

        } else {
            CommonUtil.utilsIo.contentReplaceWith(oSet.filePath, oSet.replaceText, oSet.withText);
        }

        return true;

    }

    /**
     * 文件操作
     * 
     * @param {AimLocal.IAimLocalConfig} oLocalConfig 
     * @param {AimLocal.IAimLocalNexusPlugDefine} oPlugin 
     * @param {AimLocal.IAimLocalPlugSet} oSet 
     * 
     * @memberOf PlugProcess
     */
    baseFileOption(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {

        let bFlagSuccess = true;
        if (oSet.optType != undefined) {

            switch (oSet.optType) {
                //复制文件 
                case 150306:
                    CommonUtil.utilsIo.copyFileAsync(oSet.filePath, oSet.targetPath);
                    break;
                //判断文件是否存在
                case 150206:
                    bFlagSuccess = CommonUtil.utilsIo.flagExist(oSet.filePath);
                    if (!bFlagSuccess) {
                        CommonRoot.logError(930312006, oSet.filePath);
                        this._logShow(oSet);
                    }
                    break;
                //文件不存在则拷贝 否则不处理
                case 150302:
                    if (!CommonUtil.utilsIo.flagExist(oSet.targetPath)) {
                        CommonUtil.utilsIo.copyFileAsync(oSet.filePath, oSet.targetPath);
                    }
                    break;
                //复制文件 并且进行config的替换
                case 153303:
                    let sContent = CommonUtil.utilsIo.readFile(oSet.filePath);
                    let sNewContent = LoadConfig.formatConfigString(sContent, oLocalConfig);
                    CommonUtil.utilsIo.writeFile(oSet.targetPath, sNewContent);

                    break;
                default:
                    CommonRoot.logError(930312008, oSet.optType.toString());
                    break;

            }

        }

        return bFlagSuccess;

    }


    /**
     * 设置文件内容并进行替换操作
     * 
     * @param {AimLocal.IAimLocalConfig} oLocalConfig 
     * @param {AimLocal.IAimLocalNexusPlugDefine} oPlugin 
     * @param {AimLocal.IAimLocalPlugSet} oSet 
     * 其中：name 调换标记 noteType注释类型  filePath文件路径  contentInfo内容  withText附加在该内容之后，为空则文本内容之后
     * 
     * @memberOf PlugProcess
     */
    baseFileContent(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {
        //CommonUtil.utilsIo.writeFile(oSet.filePath, oSet.contentInfo.join(''));

        if (oSet.contentInfo.length > 0) {
            if (!CommonUtil.utilsIo.flagExist(oSet.filePath)) {
                CommonUtil.utilsIo.writeFile(oSet.filePath, '');
            }

            let sAfterText = "";
            if (oSet.withText != undefined) {
                sAfterText = oSet.withText;
            }


            var sContent = CommonUtil.utilsIo.readFile(oSet.filePath);
            var sNewContent = CommonUtil.utilsString.reaplaceBig(sContent,
                CommonUtil.utilsIo.upRowSeq() + CommonRoot.upNoteMessage(1, oSet.name, oSet.noteType),
                CommonRoot.upNoteMessage(2, oSet.name, oSet.noteType),
                CommonUtil.utilsIo.upRowSeq() + oSet.contentInfo.join(CommonUtil.utilsIo.upRowSeq()) + CommonUtil.utilsIo.upRowSeq(),
                sAfterText);
            if (sContent != sNewContent) {
                CommonUtil.utilsIo.writeFile(oSet.filePath, sNewContent);
            }
        }

        return true;
    }


}




class MloadPlug {


    refreshPlug(oLocalConfig: AimLocal.IAimLocalConfig, oApp: AimLocal.IAimLocalNexusApp, oPlug: AimLocal.IAimLocalNexusPlug): AimLocal.IAimLocalNexusPlug {


        let sFileContent = CommonUtil.utilsIo.readFile(oApp.plugInfo);
        sFileContent = LoadConfig.formatConfigString(sFileContent, oLocalConfig);


        return CommonUtil.utilsHelper.deepAssign(CommonUtil.utilsJson.parse(sFileContent), oPlug);


    }




    processPlus(oLocalConfig: AimLocal.IAimLocalConfig, oPlugConfig: AimLocal.IAimLocalNexusPlug, aStep: string[]) {


        var oProcess = new PlugProcess();

        for (var p in oPlugConfig) {
            let oPlug: AimLocal.IAimLocalNexusPlugDefine = oPlugConfig[p];

            if (!oPlug.disable) {
                if (oPlug.hasOwnProperty('json')) {


                    var sFileContent = CommonUtil.utilsIo.readFile(oPlug.json);
                    sFileContent = LoadConfig.formatConfigString(sFileContent, oLocalConfig);
                    var oJsonConfig = JSON.parse(sFileContent);
                    aStep.forEach(
                        function (sStep) {

                            if (oJsonConfig.hasOwnProperty(sStep)) {
                                var aJsonStep: any[] = oJsonConfig[sStep];

                                aJsonStep.forEach((oCurrent: AimLocal.IAimLocalPlugExec) => {

                                    if (!oCurrent.disable) {
                                        CommonRoot.logDebug(970312004, [oPlug.name, oCurrent.exec]);
                                        //判断如果有扩展处理类
                                        if (!CommonUtil.utilsString.isEmpty(oCurrent.expand)) {
                                            var oExpand: AimLocal.IexpandPlusProcess = require(oCurrent.expand);

                                            let bFlagSuccess: boolean = oExpand.exec(oLocalConfig, oPlug, oCurrent.set);

                                        }
                                        else if (oProcess[oCurrent.exec]) {


                                            let bFlagSuccess: boolean = oProcess[oCurrent.exec](oLocalConfig, oPlug, oCurrent.set);
                                            if (!bFlagSuccess) {
                                                CommonRoot.logError(930312005, [oPlug.name, oCurrent.exec]);
                                            }

                                        }
                                        else {
                                            CommonRoot.logError(930312003, oCurrent.exec);
                                        }
                                    }
                                    else {
                                        CommonRoot.logDebug(970312005, [oPlug.name, oCurrent.exec]);
                                    }
                                })
                            }
                        }
                    );


                }
            }
        }

    }


}







export =new MloadPlug();
