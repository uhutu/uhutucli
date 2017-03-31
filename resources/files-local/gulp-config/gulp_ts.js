var gulp = require('gulp');
var tsGulp = require("gulp-typescript");
var tsProject = tsGulp.createProject("../../../tsconfig.json");
var watch=require('gulp-watch');
var typedoc = require("gulp-typedoc");

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


gulp.task("typedoc", function() {
    return gulp
        .src(["../../../src/**/*.ts"])
        .pipe(typedoc({
            // TypeScript options (see typescript docs) 
            module: "commonjs",
            target: "es6",
            includeDeclarations: true,
 
            // Output options (see typedoc docs) 
            out: "../../../webdoc/typedocs",
            json: "../../../webdoc/typedocs/file.json",
 
            // TypeDoc options (see typedoc docs) 
            name: "my-project",
            //theme: "/path/to/my/theme",
            //plugins: ["my", "plugins"],
            ignoreCompilerErrors: true,
            version: true,
        }))
    ;
});
