var gulp = require('gulp');
var tsGulp = require("gulp-typescript");
//var tsProject = tsGulp.createProject("../../../tsconfig.json");
var watch=require('gulp-watch');

var sTargetDept="/usr/local/lib/node_modules/uhutu-cli/";


gulp.task("ts:compile", function () {
    var tsProject = tsGulp.createProject("../../../tsconfig.json");
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir));
});


gulp.task("ts:copy", function () {
    return gulp.src(['../../../**/*','!../../../node_modules/**/*','!../../../.git/**/*']).pipe(
        gulp.dest(sTargetDept)
    );
});



gulp.task("ts",["ts:compile","ts:copy"]),


gulp.task("watch:ts", function () {
    return watch("../../../src/**/*.ts", { ignoreInitial: false },function(){
           var tsProject = tsGulp.createProject("../../../tsconfig.json");
           tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir)).pipe(gulp.dest(
            "/usr/local/lib/node_modules/uhutu-cli/compile/"
        ));
       })
});
gulp.task("watch:resources", function () {
    return watch("../../../resources/**/*", { ignoreInitial: false }).pipe(gulp.dest(sTargetDept+"resources/"));
});
gulp.task("watch", ["watch:ts","watch:resources"]);


