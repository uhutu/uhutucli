import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";

import gulp = require('gulp');
import argv = require('argv');
import sass = require('gulp-sass');
import connect = require('gulp-connect');
import nativeCss = require('gulp-react-native-css');
import rename = require('gulp-rename');



let oGulpDefine = {
    path_scss: [],
    path_html: [],
    task_scss: [],
    task_html: []
};

let oLocalConfig: AimLocal.IAimLocalConfig;

class CommandGulp {

    initStart() {

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
        oLocalConfig = JSON.parse(CommonUtil.utilsIo.readFile(sDiskConfig));


        this.initGulp();
        //this.taskConnect();
        this.taskSass();
        this.taskWatch();
        this.taskDefault();
    }

    initGulp() {
        oGulpDefine.path_scss = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + "/**/*.scss"];
        oGulpDefine.path_html = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + '/**/*.html'];
    }


    taskWatch() {
        gulp.task('watch:sass', function () {
            gulp.watch(oGulpDefine.path_scss, ['sass']);
        });

        gulp.task('watch:html', function () {
            gulp.watch(oGulpDefine.path_html, ['html']);
        });
        gulp.task('watch', ['watch:html', 'watch:sass']);
    }

    taskConnect() {
        gulp.task('connect', function () {
            connect.server({
                root: oLocalConfig.define.devPath,
                livereload: true
            });
        });
    }

    taskSass() {

        gulp.task('sass:react', function () {
            return gulp.src(oGulpDefine.path_scss)
                .pipe(sass().on('error', sass.logError))
                .pipe(nativeCss())
                .pipe(rename({
                    suffix: "-style",
                    extname: ".js"
                }))
                .pipe(gulp.dest(oLocalConfig.appReact.buildPath + "/" + oLocalConfig.inc.projectPage));
        });

        gulp.task('sass', ['sass:react']);

    }

    taskDefault() {
        gulp.task('default', ["sass", "watch"]);
    }


}


let oCommandGulp = new CommandGulp();
oCommandGulp.initStart();


