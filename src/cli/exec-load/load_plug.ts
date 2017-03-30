import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";
import LoadConfig = require("../../cli/exec-load/load_config");

class PlugProcess {

    reactAddLink(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin, oSet) {
        var oPackage = CommonUtil.utilsIo.upConfigByFile(oLocalConfig.file.reactPackage);
        if (!oPackage.links.hasOwnProperty(oPlugin.name)) {
            CommonUtil.utilsHelper.spawnSync('react-native', ['link', oPlugin.name], { cwd: oLocalConfig.appReact.workPath });
            oPackage.links[oPlugin.name] = oPlugin.version;
            CommonUtil.utilsJson.saveJsonFile(oLocalConfig.file.reactPackage, oPackage);
        }

    }

    iosAddPlist(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin, oSet) {
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
    }


    androidAddStrings(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin, oSet) {
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
    }


    baseContentReplace(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin, oSet) {
        CommonUtil.utilsIo.contentReplaceWith(oSet.filePath, oSet.replaceText, oSet.withText);
    }


}




class Mexport {


    processPlus(oLocalConfig: AimLocal.IAimLocalConfig, oPlugConfig:AimLocal.IAimLocalNexusPlug ,aStep: string[]) {


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

                                aJsonStep.forEach((oCurrent) => {
                                    if (oProcess[oCurrent.exec]) {

                                        CommonRoot.logDebug(970312004, oPlug.name, oCurrent.exec);

                                        oProcess[oCurrent.exec](oLocalConfig, oPlug, oCurrent.set);

                                    }
                                    else {
                                        CommonRoot.logError(930312003, oCurrent.exec);
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







export =new Mexport();
