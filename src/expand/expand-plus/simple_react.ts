import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";


class SimpleReact implements AimLocal.IexpandPlusProcess {


    exec(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {



        let sPagesPath = CommonUtil.utilsIo.pathJoin(oLocalConfig.define.devPath, "pages");

        let aFiles = CommonUtil.utilsIo.listDir(sPagesPath);

        let aNewName = [];

        aFiles.forEach(
            (sName) => {
                let sExt = CommonUtil.utilsIo.upExtName(sName);

                if (sExt === '.html') {
                    sName = 'pages' + sName.replace(sPagesPath, '').replace(sExt, '');
                    aNewName.push(CommonUtil.utilsString.replaceAll(sName, CommonUtil.utilsIo.upPathSeq(), "_"));
                }
            }
        )




        console.log(aNewName);


        return true;

    }

}



export =new SimpleReact();