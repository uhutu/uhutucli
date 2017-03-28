#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_base = require("./cmd-start/start_base");
var argv = require('argv-parse');
var defEnv = {
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
start_base.initFromArgs(defEnv);
