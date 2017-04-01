var gulp = require('gulp');

var watch=require('gulp-watch');
var typedoc = require("gulp-typedoc");



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
