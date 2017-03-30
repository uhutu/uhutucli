import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");
import * as AimLocal from "../../cli/aim-top/aim_local";

import gulp = require('gulp');
import argv = require('argv');
import sass = require('gulp-sass');
import connect = require('gulp-connect');
import nativeCss = require('gulp-react-native-css');
import rename = require('gulp-rename');
import GulpPlus = require("../../project/gulp-use/gulp_plus");


let oGulpDefine = {
    pathSass: [],
    pathHtml: [],
    task_default: []
};

let oLocalConfig: AimLocal.IAimLocalConfig;




class GulpTask {


    taskName: string = ""

    subTask: string[] = []

    constructor(sTaskName: string) {
        this.taskName = sTaskName;

    }
    inSubTask(sSubTaskName: string, fTaskFunction: Function): string {

        var sSubName = this.taskName + ":" + sSubTaskName;
        this.subTask.push(sSubName);

        gulp.task(sSubName, fTaskFunction);

        return sSubName;

    }
    inTopTask() {

        gulp.task(this.taskName, this.subTask);
        oGulpDefine.task_default.push(this.taskName);

    }


}



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
        this.taskHtml();
        this.taskSass();
        this.taskWatch();
        this.taskDefault();
    }

    initGulp() {
        oGulpDefine.pathSass = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + "/**/*.scss"];
        oGulpDefine.pathHtml = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + '/**/*.html'];
    }


    taskWatch() {

        var oTask = new GulpTask("main_watch");

        oTask.inSubTask("sass", function () {
            gulp.watch(oGulpDefine.pathSass, ['main_sass']);
        });

        oTask.inSubTask("html", function () {
            gulp.watch(oGulpDefine.pathHtml, ['main_html']);
        });

        oTask.inTopTask();
    }

    taskConnect() {

        var oTask = new GulpTask("main_connect");
        oTask.inSubTask("server", function () {
            connect.server({
                root: oLocalConfig.define.devPath,
                livereload: true
            });
        });
        oTask.inTopTask();
    }

    taskHtml() {


        var oTask = new GulpTask("main_html");
        oTask.inSubTask("react", function () {
            return gulp.src(oGulpDefine.pathHtml)
                //.pipe(GulpPlus.gulpContent(oLocalConfig, "react"))
                .pipe(rename({
                    extname: ".js"
                }))
                .pipe(gulp.dest(oLocalConfig.appReact.buildPath + "/" + oLocalConfig.inc.projectPage));
        });
        oTask.inTopTask();


    }

    taskSass() {


        var oTask = new GulpTask("main_sass");
        oTask.inSubTask("react", function () {
            return gulp.src(oGulpDefine.pathSass)
                .pipe(sass().on('error', sass.logError))
                .pipe(nativeCss())
                .pipe(rename({
                    suffix: "-style",
                    extname: ".js"
                }))
                .pipe(gulp.dest(oLocalConfig.appReact.buildPath + "/" + oLocalConfig.inc.projectPage));
        });
        oTask.inTopTask();

    }

    taskDefault() {
        gulp.task('default', oGulpDefine.task_default);
    }


}


let oCommandGulp = new CommandGulp();
oCommandGulp.initStart();


