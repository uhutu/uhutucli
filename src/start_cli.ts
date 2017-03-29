#!/usr/bin/env node

import start_base = require("./cli/cmd-start/start_base");
import DefineEnv=require("./cli/default-define/define_env");
import argv = require('argv');


let defEnv = DefineEnv.upEnv();
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


