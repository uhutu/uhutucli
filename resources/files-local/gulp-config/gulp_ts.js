var gulp = require('gulp');
var tsGulp = require("gulp-typescript");
var tsProject = tsGulp.createProject("../../../tsconfig.json");
var watch=require('gulp-watch');


gulp.task("ts", function () {

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir));
});


gulp.task("watch:ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir)).pipe(gulp.dest(
            "/usr/local/lib/node_modules/uhutu-cli/compile/"
        ));
});
gulp.task("watch", function () {

    //gulp.watch(["../../../src/**/*.ts"], ['watch:ts']);
   

       return watch("../../../src/**/*.ts",function(){
           tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir)).pipe(gulp.dest(
            "/usr/local/lib/node_modules/uhutu-cli/compile/"
        ));
       })
});
