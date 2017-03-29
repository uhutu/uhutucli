#!/usr/bin/env node

import start_base = require("../../cli/cmd-start/start_base");
import DefineEnv = require("../../cli/default-define/define_env");
import argv = require('argv');


let defEnv = DefineEnv.upEnv();
defEnv.pathStart = __dirname;

defEnv.pathCwd = process.cwd();


let oArgs = argv.option(
    [
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
        }
        ,
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
    ]
).run();


defEnv.argsConfig = oArgs.options.config;
defEnv.argsInstall = oArgs.options.install;
defEnv.argsForce = oArgs.options.force;
defEnv.argsLog = oArgs.options.log;
defEnv.argsBuild = oArgs.options.build;


start_base.initStart(defEnv);


