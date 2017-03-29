import gulp = require('gulp');
import argv = require('argv');


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

let sDiskConfig=args.options.diskconfig;


console.log(sDiskConfig);


gulp.task('default', function () {

});
