import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";

import ejs = require("ejs");

class CfileInfo {
    filePath: string
    uqName: string
    importName: string
    screenName: string
}


class SimpleReact implements AimLocal.IexpandPlusProcess {


    exec(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {



        let sPagesPath = CommonUtil.utilsIo.pathJoin(oLocalConfig.define.devPath, "pages");

        let aFiles = CommonUtil.utilsIo.listDir(sPagesPath);

        let aNewName: CfileInfo[] = [];

        aFiles.forEach(
            (sName) => {

                let cFile = new CfileInfo();
                let sExt = CommonUtil.utilsIo.upExtName(sName);

                if (sExt === '.html') {


                    cFile.filePath = 'pages' + sName.replace(sPagesPath, '').replace(sExt, '');

                    cFile.uqName = CommonUtil.utilsString.replaceAll(cFile.filePath, CommonUtil.utilsIo.upPathSeq(), "_");

                    cFile.importName = "import " + cFile.uqName + " from '../../../" + cFile.filePath + "';";

                    cFile.screenName = cFile.uqName + ":{screen:" + cFile.uqName + "},";
                    aNewName.push(cFile);

                }
            }
        )

        let aImport = [];
        let aScreen = [];

        aNewName.forEach((cFile) => {

            aImport.push(cFile.importName);
            

        })



        var sContent = CommonUtil.utilsIo.readFile(oSet.filePath);

        var oSource = CommonUtil.utilsJson.readJsonFile(oSet.sourcePath);

        try {

            sContent = ejs.render(sContent, { out: oSource, paths: aNewName });

        } catch (e) {
            console.warn(e);
        }


        CommonUtil.utilsIo.writeFile(oSet.extendAfield, aImport.join(CommonUtil.utilsIo.upRowSeq()));

        


        CommonUtil.utilsIo.writeFile(oSet.targetPath, sContent);



        //console.log(aNewName);


        return true;

    }

}



export =new SimpleReact();