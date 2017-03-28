#!/usr/bin/env node

import start_base = require("./cmd-start/start_base");
import { MAimLocalEnv } from "./aim-top/aim_local";



import argv = require('argv-parse');


let defEnv: MAimLocalEnv = new MAimLocalEnv();
defEnv.dirPath = __dirname;

defEnv.cwdPath = process.cwd();
//定义命令行参数类型
var args = argv({
    init: {
        type: 'bool',
        alias: 'i'
    },
    force: {
        type: 'bool',
        alias: 'f'
    }
});

defEnv.argsInit = args.init;


start_base.initStart(defEnv);


