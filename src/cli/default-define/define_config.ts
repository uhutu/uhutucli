import * as AimLocal from "../../cli/aim-top/aim_local";


class DefineConfig implements AimLocal.IAimLocalConfig {

    envs: AimLocal.IAimLocalEnv


}

class MAimLocalEnv {
    upConfig(oEnv: AimLocal.IAimLocalEnv): AimLocal.IAimLocalConfig {


        let defineConfig = new DefineConfig();

        defineConfig.envs = oEnv;

        return defineConfig;
    }
}

export =new MAimLocalEnv();
