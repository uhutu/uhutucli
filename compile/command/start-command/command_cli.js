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
        short: 'b',
        type: 'string',
        description: '编译项目文件'
    },
    {
        name: 'config',
        type: 'boolean',
        description: '初始化配置文件'
    },
    {
        name: 'install',
        short: 'i',
        type: 'boolean',
        description: '安装并初始化各种插件'
    },
    {
        name: 'force',
        short: 'f',
        type: 'boolean',
        description: '强制覆盖'
    },
    {
        name: 'log',
        type: 'string',
        description: '日志级别:debug info warn error'
    }
]).run();
defEnv.argsConfig = oArgs.options.config;
defEnv.argsInstall = oArgs.options.install;
defEnv.argsForce = oArgs.options.force;
defEnv.argsLog = oArgs.options.log;
defEnv.argsBuild = oArgs.options.build;
start_base.initStart(defEnv);
