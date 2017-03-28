#!/usr/bin/env node

import start_base = require("./cmd-start/start_base");
import { IAimLocalEnv } from "./aim-interface/aim-local";



let argv = require('argv-parse');


let defEnv: IAimLocalEnv = {
    dirPath: "",
    argStart: null
};
defEnv.dirPath = __dirname;


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

defEnv.argStart = args;

console.log(defEnv);

start_base.initStart(defEnv);


