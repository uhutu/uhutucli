"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var gulp = require("gulp");
var argv = require("argv");
var sass = require("gulp-sass");
var nativeCss = require("gulp-react-native-css");
var rename = require("gulp-rename");
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
CommonRoot.logInfo(962001003, sDiskConfig);
var oLocalConfig = JSON.parse(CommonUtil.utilsIo.readFile(sDiskConfig));
var oGulp = {
    path_scss: [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + "/**/*.scss"],
    path_html: [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + '/**/*.html'],
    task_scss: [],
    task_html: []
};
gulp.task('sass:react', function () {
    return gulp.src(oGulp.path_scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(nativeCss())
        .pipe(rename({
        suffix: "-style",
        extname: ".js"
    }))
        .pipe(gulp.dest(oLocalConfig.appReact.buildPath + "/" + oLocalConfig.inc.projectPage));
});
gulp.task('sass', ['sass:react']);
gulp.task('default', ["sass"]);
