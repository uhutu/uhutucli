import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";

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
        let aScreen=[];

        aNewName.forEach((cFile) => {

            aImport.push(cFile.importName);
            aScreen.push(cFile.screenName);

        })



        var sContent = CommonUtil.utilsIo.readFile(oSet.filePath);
        var sNewContent = CommonUtil.utilsString.reaplaceBig(sContent,
            CommonUtil.utilsIo.upRowSeq() + "//auto_code_simple_index_import_begin",
            "//auto_code_simple_index_import_end",
            CommonUtil.utilsIo.upRowSeq() + aImport.join(CommonUtil.utilsIo.upRowSeq()) + CommonUtil.utilsIo.upRowSeq(),
            "");

            sNewContent = CommonUtil.utilsString.reaplaceBig(sContent,
            CommonUtil.utilsIo.upRowSeq() + "//auto_code_simple_index_screen_begin",
            "//auto_code_simple_index_screen_begin",
            CommonUtil.utilsIo.upRowSeq() + aScreen.join(CommonUtil.utilsIo.upRowSeq()) + CommonUtil.utilsIo.upRowSeq(),
            "");
        if (sContent != sNewContent) {
            CommonUtil.utilsIo.writeFile(oSet.filePath, sNewContent);
        }


        //console.log(aNewName);


        return true;

    }

}



export =new SimpleReact();