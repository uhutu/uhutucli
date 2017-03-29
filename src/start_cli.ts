#!/usr/bin/env node

import start_base = require("./cli/cmd-start/start_base");
import { MAimLocalEnv } from "./cli/aim-top/aim_local";



import argv = require('argv');


let defEnv: MAimLocalEnv = new MAimLocalEnv();
defEnv.pathStart = __dirname;

defEnv.pathCwd = process.cwd();


let args = argv.option( 
    [
    {
        name: 'init',
        type: 'boolean',
        description: 'init project with one config.json file'
    },
    {
        name: 'install',
        type: 'boolean',
        description: 'install npm files ,exec after init'
    }
]
).run();


defEnv.argsInit = args.options.init;


start_base.initStart(defEnv);


