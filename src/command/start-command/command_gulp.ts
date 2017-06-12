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
import watch = require('gulp-watch');


let oGulpDefine = {
    pathSass: [],
    pathHtml: [],
    pathStatic: [],
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
        this.taskConnect();
        this.taskHtml();
        this.taskSass();
        this.taskStatic();
        //this.taskWatch();
        this.taskDefault();
    }

    initGulp() {
        oGulpDefine.pathSass = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + "/**/*.scss"];
        oGulpDefine.pathHtml = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + '/**/*.html'];

        oGulpDefine.pathStatic = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectStatic + '/**/*'];

    }

    /**
     * 监听任务  该任务已删除 替换为gulp-watch插件进行监听修改
     */
    taskWatch() {

        var oTask = new GulpTask("main_watch");

        oTask.inSubTask("sass", function () {
            gulp.watch(oGulpDefine.pathSass, ['main_sass']);
        });

        oTask.inSubTask("html", function () {
            gulp.watch(oGulpDefine.pathHtml, ['main_html']);
        });

        oTask.inSubTask("static", function () {
            gulp.watch(oGulpDefine.pathHtml, ['main_static']);
        });

        oTask.inTopTask();
    }

    taskConnect() {

        var oTask = new GulpTask("main_connect");
        oTask.inSubTask("server", function () {
            connect.server({
                root: oLocalConfig.appVue.buildPath,
                livereload: true
            });
        });
        oTask.inTopTask();
    }

    taskHtml() {


        var oTask = new GulpTask("main_html");


        if (!oLocalConfig.appReact.disable) {

            oTask.inSubTask("react", function () {
                return watch(oGulpDefine.pathHtml, { ignoreInitial: false })

                    .pipe(GulpPlus.gulpContent(oLocalConfig, "react"))
                    .pipe(rename({
                        extname: ".js"
                    }))
                    .pipe(gulp.dest(oLocalConfig.appReact.buildPath + "/" + oLocalConfig.inc.projectPage))
                    //.pipe(function(cb){console.log('aa');})
                    ;
            });
        }
        if (!oLocalConfig.appVue.disable) {
            oTask.inSubTask("vue", function () {
                return watch(oGulpDefine.pathHtml, { ignoreInitial: false })

                    .pipe(GulpPlus.gulpContent(oLocalConfig, "vue"))
                    .pipe(gulp.dest(oLocalConfig.appVue.buildPath + "/" + oLocalConfig.inc.projectPage))
                    .pipe(connect.reload());
            });
        }



        if (!oLocalConfig.appWeapp.disable) {
            oTask.inSubTask("weapp", function () {
                return watch(oGulpDefine.pathHtml, { ignoreInitial: false })
                    .pipe(GulpPlus.gulpContent(oLocalConfig, "weapp"))
                    .pipe(rename({
                        extname: ".wxml"
                    }))
                    .pipe(gulp.dest(oLocalConfig.appWeapp.buildPath + "/" + oLocalConfig.inc.projectPage));
            });
        }

        oTask.inTopTask();




    }


    taskStatic() {

        var oTask = new GulpTask("main_static");
        oTask.inSubTask("react", function () {
            return watch(oGulpDefine.pathStatic, { ignoreInitial: false })

                .pipe(rename(function (sPath) {
                    //将资源文件的一级目录修改为对应的工程的名字 以方便拷贝

                    let sPathName: string = sPath.dirname;
                    var aPathSplit = sPathName.split(CommonUtil.utilsIo.upPathSeq());
                    if (aPathSplit.length > 0) {
                        aPathSplit[0] = aPathSplit[0] + oLocalConfig.project.projectName;
                        sPathName = aPathSplit.join(CommonUtil.utilsIo.upPathSeq());
                    }
                    sPath.dirname = sPathName;

                    //特殊判断 如果是jsx文件则替换为js结尾
                    if (sPath.extname === ".jsx") {
                        sPath.extname = ".js"
                    }


                }))
                .pipe(gulp.dest(oLocalConfig.define.workSpace));
        });

        oTask.inTopTask();
    }

    taskSass() {


        var oTask = new GulpTask("main_sass");

        if (!oLocalConfig.appReact.disable) {
            oTask.inSubTask("react", function () {
                return watch(oGulpDefine.pathSass, { ignoreInitial: false })

                    .pipe(sass().on('error', sass.logError))
                    .pipe(nativeCss())
                    .pipe(rename({
                        suffix: "-style",
                        extname: ".js"
                    }))
                    .pipe(gulp.dest(oLocalConfig.appReact.buildPath + "/" + oLocalConfig.inc.projectPage));
            });
        }

        if (!oLocalConfig.appVue.disable) {
            oTask.inSubTask("vue", function () {
                return watch(oGulpDefine.pathSass, { ignoreInitial: false })
                    .pipe(GulpPlus.gulpCss(oLocalConfig, "vue"))
                    .pipe(sass().on('error', sass.logError))

                    .pipe(gulp.dest(oLocalConfig.appVue.buildPath + "/" + oLocalConfig.inc.projectPage)).pipe(connect.reload());
            });
        }

        if (!oLocalConfig.appWeapp.disable) {

            oTask.inSubTask("weapp", function () {
                return watch(oGulpDefine.pathSass, { ignoreInitial: false })

                    .pipe(sass().on('error', sass.logError))
                    .pipe(rename({
                        extname: ".wxss"
                    }))
                    .pipe(gulp.dest(oLocalConfig.appWeapp.buildPath + "/" + oLocalConfig.inc.projectPage));
            });
        }

        oTask.inTopTask();

    }

    taskDefault() {
        gulp.task('default', oGulpDefine.task_default);
    }


}


let oCommandGulp = new CommandGulp();
oCommandGulp.initStart();


