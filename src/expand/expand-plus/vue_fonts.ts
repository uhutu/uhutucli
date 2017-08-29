import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";


interface IFontConfig {
    name: string
    file: string
}

class VueFonts implements AimLocal.IexpandPlusProcess {


    exec(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {


        let sParseFile = oSet.contentInfo.join('');

        let aFontConfig: IFontConfig[] = JSON.parse(sParseFile);

        let sPath = oLocalConfig.appReact.workPath + '/node_modules/react-native-vector-icons';



        if (CommonUtil.utilsIo.flagExist(sPath)) {



            let aMaps = CommonUtil.utilsIo.listDir(sPath + '/glyphmaps');

            let aCssContent: string[] = [];

            aMaps.forEach((oItem: string) => {


                aFontConfig.forEach(element => {

                    if (oItem.endsWith(element.file + '.json')) {




                        aCssContent.push("@font-face {font-family: " + element.name + ";src:url('fonts/" + element.file + ".ttf');}");

                        aCssContent.push(".font_" + element.name + "{font-family:'" + element.name + "';font-style: normal;}");

                        let oJson = CommonUtil.utilsJson.readJsonFile(oItem);

                        for (var p in oJson) {

                            let oVal = oJson[p];

                            aCssContent.push('.font_' + element.name + '_' + p + ':before{content:\'\\' + oVal.toString(16) + '\';}');

                        }

                    }
                });


            })

            if (aCssContent.length > 0) {
                CommonUtil.utilsIo.writeFile(oSet.filePath, aCssContent.join(CommonUtil.utilsIo.upRowSeq()));
            }


            let aFonts = CommonUtil.utilsIo.listDir(sPath + '/Fonts');

            aFonts.forEach((oItem: string) => {


                aFontConfig.forEach(element => {

                    if (oItem.endsWith(element.file + '.ttf')) {

                        CommonUtil.utilsIo.copyFileAsync(oItem, oSet.targetPath + '/' + element.file + '.ttf');

                    }
                })
            });





        }

        return true;

    }

}



export =new VueFonts();