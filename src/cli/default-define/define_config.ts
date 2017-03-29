import * as AimLocal from "../../cli/aim-top/aim_local";



let currentConfig: AimLocal.IAimLocalConfig = {
    env: null,

    project: {

        projectName: "demo"
    },

    appReact: {
        workName: "react[@config:project.projectName]"
    }
}


class MAimLocalEnv {
    upConfig(oEnv: AimLocal.IAimLocalNexusEnv): AimLocal.IAimLocalConfig {


        let defineConfig: AimLocal.IAimLocalConfig = currentConfig;

        defineConfig.env = oEnv;



        return defineConfig;
    }
}






export =new MAimLocalEnv();
