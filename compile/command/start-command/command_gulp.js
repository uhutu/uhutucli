"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonRoot = require("../../base/common/root");
var CommonUtil = require("../../base/common/util");
var gulp = require("gulp");
var argv = require("argv");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var nativeCss = require("gulp-react-native-css");
var rename = require("gulp-rename");
var oGulpDefine = {
    pathSass: [],
    pathHtml: [],
    task_default: []
};
var oLocalConfig;
var GulpTask = (function () {
    function GulpTask(sTaskName) {
        this.taskName = "";
        this.subTask = [];
        this.taskName = sTaskName;
    }
    GulpTask.prototype.inSubTask = function (sSubTaskName, fTaskFunction) {
        var sSubName = this.taskName + ":" + sSubTaskName;
        this.subTask.push(sSubName);
        gulp.task(sSubName, fTaskFunction);
        return sSubName;
    };
    GulpTask.prototype.inTopTask = function () {
        gulp.task(this.taskName, this.subTask);
        oGulpDefine.task_default.push(this.taskName);
    };
    return GulpTask;
}());
var CommandGulp = (function () {
    function CommandGulp() {
    }
    CommandGulp.prototype.initStart = function () {
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
        CommonRoot.logInfo(960312003, sDiskConfig);
        oLocalConfig = JSON.parse(CommonUtil.utilsIo.readFile(sDiskConfig));
        this.initGulp();
        //this.taskConnect();
        this.taskHtml();
        this.taskSass();
        this.taskWatch();
        this.taskDefault();
    };
    CommandGulp.prototype.initGulp = function () {
        oGulpDefine.pathSass = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + "/**/*.scss"];
        oGulpDefine.pathHtml = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + '/**/*.html'];
    };
    CommandGulp.prototype.taskWatch = function () {
        var oTask = new GulpTask("main_watch");
        oTask.inSubTask("sass", function () {
            gulp.watch(oGulpDefine.pathSass, ['main_sass']);
        });
        oTask.inSubTask("html", function () {
            gulp.watch(oGulpDefine.pathHtml, ['main_html']);
        });
        oTask.inTopTask();
    };
    CommandGulp.prototype.taskConnect = function () {
        var oTask = new GulpTask("main_connect");
        oTask.inSubTask("server", function () {
            connect.server({
                root: oLocalConfig.define.devPath,
                livereload: true
            });
        });
        oTask.inTopTask();
    };
    CommandGulp.prototype.taskHtml = function () {
        var oTask = new GulpTask("main_html");
        oTask.inSubTask("react", function () {
            return gulp.src(oGulpDefine.pathHtml)
                .pipe(rename({
                extname: ".js"
            }))
                .pipe(gulp.dest(oLocalConfig.appReact.buildPath + "/" + oLocalConfig.inc.projectPage));
        });
        oTask.inTopTask();
        console.log('cdessgfg');
    };
    CommandGulp.prototype.taskSass = function () {
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
    };
    CommandGulp.prototype.taskDefault = function () {
        gulp.task('default', oGulpDefine.task_default);
    };
    return CommandGulp;
}());
var oCommandGulp = new CommandGulp();
oCommandGulp.initStart();
