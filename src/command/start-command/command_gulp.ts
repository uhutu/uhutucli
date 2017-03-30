import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";

import gulp = require('gulp');
import argv = require('argv');
import sass = require('gulp-sass');
import connect = require('gulp-connect');
import nativeCss = require('gulp-react-native-css');
import rename = require('gulp-rename');

let args = argv.option(
    [
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
    ]
).run();

let sDiskConfig = args.options.diskconfig;
CommonRoot.logInfo(960312003, sDiskConfig);
let oLocalConfig: AimLocal.IAimLocalConfig = JSON.parse(CommonUtil.utilsIo.readFile(sDiskConfig));



var oGulp = {
    path_scss: [oLocalConfig.define.devPath +"/"+oLocalConfig.inc.projectPage+ "/**/*.scss"],
    path_html: [oLocalConfig.define.devPath+"/"+oLocalConfig.inc.projectPage+ '/**/*.html'],
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
        .pipe(gulp.dest(oLocalConfig.appReact.buildPath+"/"+oLocalConfig.inc.projectPage));
});

gulp.task('sass', ['sass:react']);


gulp.task('default', ["sass"]);
