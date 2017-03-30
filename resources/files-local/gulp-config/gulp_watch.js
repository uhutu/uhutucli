var gulp = require('gulp');
var tsGulp = require("gulp-typescript");
var watch = require("gulp-watch");
var tsProject = tsGulp.createProject("../../../tsconfig.json");


gulp.task("ts", function () {
    
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir)).pipe(gulp.dest(
            "/usr/local/lib/node_modules/uhutu-cli/compile/"
        ));
});



gulp.task("file", function () {

    gulp.watch(["../../../src/**/*"], ['ts']);

});


gulp.task("watch",["file"]);

gulp.task("watch2", function () {
    return watch('../../../src/**/*', function () {
        console.log('change');

        tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir)).pipe(gulp.dest(
            "/usr/local/lib/node_modules/uhutu-cli/compile/"
        ))
    });

});