/**
 * Created by Mordekaiser on 05/02/16.
 */
// Gulp, more information at http://gulpjs.com/
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 5002
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('restarting...');
        })
});