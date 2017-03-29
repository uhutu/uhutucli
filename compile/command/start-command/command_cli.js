#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_base = require("../../cli/cmd-start/start_base");
var DefineEnv = require("../../cli/default-define/define_env");
var argv = require("argv");
var defEnv = DefineEnv.upEnv();
defEnv.pathStart = __dirname;
defEnv.pathCwd = process.cwd();
var oArgs = argv.option([
    {
        name: 'build',
        type: 'boolean',
        description: 'build workspace'
    },
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
        description: 'show log type value of:debug info warn error'
    }
]).run();
defEnv.argsConfig = oArgs.options.config;
defEnv.argsInstall = oArgs.options.install;
defEnv.argsForce = oArgs.options.force;
defEnv.argsLog = oArgs.options.log;
defEnv.argsBuild = oArgs.options.build;
start_base.initStart(defEnv);
