var gulp = require('gulp');
var tsGulp = require("gulp-typescript");
var tsProject = tsGulp.createProject("../../../tsconfig.json");


gulp.task("ts", function () {

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir));
});