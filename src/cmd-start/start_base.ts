
import * as AimLocal from "../aim-interface/aim-local";

import init_project = require("../exec-init/init_project");

class StartBase implements AimLocal.IAimLocalInit {



    initStart(envs: AimLocal.IAimLocalEnv) {
        if (envs.argStart.init) {
            init_project.initStart(envs);

        }

    }


}


export =new StartBase();

