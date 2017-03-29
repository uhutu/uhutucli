
import * as AimLocal from "../../cli/aim-top/aim_local";


class DefineEnv implements AimLocal.IAimLocalNexusEnv {


    pathStart: string

    pathCli: string

    pathCwd: string

    fileConfig = "config.json"

    dirTemplateInit = "resources/files-template/project-init"

    argsConfig = false

    argsInstall = false

    argsForce = false

}

class MAimLocalEnv {
    upEnv(): AimLocal.IAimLocalNexusEnv {
        return new DefineEnv();
    }
}

export =new MAimLocalEnv();
