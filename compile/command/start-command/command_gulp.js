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
    path_scss: [],
    path_html: [],
    task_scss: [],
    task_html: []
};
var oLocalConfig;
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
        this.taskSass();
        this.taskWatch();
        this.taskDefault();
    };
    CommandGulp.prototype.initGulp = function () {
        oGulpDefine.path_scss = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + "/**/*.scss"];
        oGulpDefine.path_html = [oLocalConfig.define.devPath + "/" + oLocalConfig.inc.projectPage + '/**/*.html'];
    };
    CommandGulp.prototype.taskWatch = function () {
        gulp.task('watch:sass', function () {
            gulp.watch(oGulpDefine.path_scss, ['sass']);
        });
        gulp.task('watch:html', function () {
            gulp.watch(oGulpDefine.path_html, ['html']);
        });
        gulp.task('watch', ['watch:html', 'watch:sass']);
    };
    CommandGulp.prototype.taskConnect = function () {
        gulp.task('connect', function () {
            connect.server({
                root: oLocalConfig.define.devPath,
                livereload: true
            });
        });
    };
    CommandGulp.prototype.taskSass = function () {
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
    };
    CommandGulp.prototype.taskDefault = function () {
        gulp.task('default', ["sass", "watch"]);
    };
    return CommandGulp;
}());
var oCommandGulp = new CommandGulp();
oCommandGulp.initStart();
