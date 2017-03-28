#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_base = require("./cmd-start/start_base");
var aim_local_1 = require("./aim-top/aim_local");
var argv = require("argv-parse");
var defEnv = new aim_local_1.MAimLocalEnv();
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
