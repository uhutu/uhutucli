
import * as AimLocal from "../../cli/aim-top/aim_local";


class SimpleReact implements AimLocal.IexpandPlusProcess {


    exec(oLocalConfig: AimLocal.IAimLocalConfig, oPlugin: AimLocal.IAimLocalNexusPlugDefine, oSet: AimLocal.IAimLocalPlugSet): boolean {

        

        


        return true;

    }

}



export =new SimpleReact();