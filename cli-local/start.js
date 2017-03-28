#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_base = require("./cmd-start/start_base");
var aim_local_1 = require("./aim-top/aim_local");
var argv = require("argv");
var defEnv = new aim_local_1.MAimLocalEnv();
defEnv.pathStart = __dirname;
defEnv.pathCwd = process.cwd();
var args = argv.option([
    {
        name: 'init',
        short: 'i',
        type: 'boolean'
    },
    {
        name: 'install',
        short: 'p',
        type: 'boolean'
    }
]).run();
defEnv.argsInit = args.options.init;
start_base.initStart(defEnv);
