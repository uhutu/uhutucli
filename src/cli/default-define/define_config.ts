import * as AimLocal from "../../cli/aim-top/aim_local";


class DefineConfig implements AimLocal.IAimLocalConfig {

    envs: AimLocal.IAimLocalNexusEnv
    queues = []
}





class MAimLocalEnv {
    upConfig(oEnv: AimLocal.IAimLocalNexusEnv): AimLocal.IAimLocalConfig {


        let defineConfig: AimLocal.IAimLocalConfig = new DefineConfig();

        defineConfig.envs = oEnv;

        defineConfig.queues.push(new NexusQueueReact());

        return defineConfig;
    }
}


class NexusQueueReact implements AimLocal.IAimLocalNexusQueue {
    workType = "react"
    workName = "react[@config:projects.projectName]"
}




export =new MAimLocalEnv();
