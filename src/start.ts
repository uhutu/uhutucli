#!/usr/bin/env node

import start_base = require("./cmd-start/start_base");
import { MAimLocalEnv } from "./aim-top/aim_local";



import argv = require('argv');


let defEnv: MAimLocalEnv = new MAimLocalEnv();
defEnv.pathStart = __dirname;

defEnv.pathCwd = process.cwd();


var args = argv.option( 
    [
    {
        name: 'init',
        short:'i',
        type: 'boolean'
    },
    {
        name: 'install',
        short: 'p',
        type: 'boolean'
    }
]
).run();


defEnv.argsInit = args.options.init;


start_base.initStart(defEnv);


