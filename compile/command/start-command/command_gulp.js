"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var argv = require("argv");
var args = argv.option([
    {
        name: 'diskconfig',
        type: 'string',
        description: 'diskconfig'
    },
    {
        name: 'cwd',
        type: 'string',
        description: 'cwd'
    }
]).run();
var sDiskConfig = args.options.diskconfig;
gulp.task('default', function () {
});
