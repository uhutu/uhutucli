#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_base = require("./cli/cmd-start/start_base");
var DefineEnv = require("./cli/default-define/define_env");
var argv = require("argv");
var defEnv = DefineEnv.upEnv();
defEnv.pathStart = __dirname;
defEnv.pathCwd = process.cwd();
var args = argv.option([
    {
        name: 'config',
        type: 'boolean',
        description: 'init project with one config.json file'
    },
    {
        name: 'install',
        type: 'boolean',
        description: 'install npm files ,exec after init'
    },
    {
        name: 'force',
        type: 'boolean',
        description: 'force overwrite'
    },
    {
        name: 'log',
        type: 'string',
        description: 'show log type'
    }
]).run();
defEnv.argsConfig = args.options.config;
defEnv.argsInstall = args.options.install;
defEnv.argsForce = args.options.force;
defEnv.argsLog = args.options.log;
start_base.initStart(defEnv);
