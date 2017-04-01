var gulp = require('gulp');
var tsGulp = require("gulp-typescript");
var tsProject = tsGulp.createProject("../type-script/mochatest_config.json");
var rename = require("gulp-rename");
var CommonUtil=require("../../../compile/base/common/util");
var replace = require('gulp-replace');


gulp.task("mochatest", function () {

    return tsProject.src()
                .pipe(tsProject())
                .js.
                pipe(rename(function (oPath) {
                   

                    oPath.dirname=CommonUtil.utilsString.substringAfterLast(oPath.dirname,CommonUtil.utilsIo.upPathSeq());
                
            })).
            pipe(replace("../../../src/","../../../compile/")).
                pipe(gulp.dest(tsProject.options.outDir));

    
});