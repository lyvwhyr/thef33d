/**
* thef33d
* (c) brandon <brandon@thef33d.com>
*/


let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let plumber = require('gulp-plumber');
let livereload = require('gulp-livereload');
let stylus = require('gulp-stylus');
let typescript = require('gulp-typescript');

gulp.task('stylus', function () {
 gulp.src('src/styles/**/*.styl')
   .pipe(plumber())
   .pipe(stylus())
   .pipe(gulp.dest('./src/styles'))
   .pipe(livereload());
});

gulp.task('typescript', function () {
 gulp.src('src/scripts/**/*.ts')
   .pipe(plumber())
   .pipe(typescript())
   .pipe(gulp.dest('./src/scripts'))
   .pipe(livereload());
});

gulp.task('watch', function() {
 gulp.watch('src/styles/**/*.styl', ['stylus']);
 gulp.watch('src/scripts/**/*.ts', ['typescript']);
});

gulp.task('develop', function () {
 livereload.listen();
 nodemon({
   script: 'www/dev-server.js',
   ext: 'js coffee handlebars ts',
   stdout: false
 }).on('readable', function () {
   this.stdout.on('data', function (chunk) {
     if(/^Express server listening on port/.test(chunk)){
       livereload.changed(__dirname);
     }
   });
   this.stdout.pipe(process.stdout);
   this.stderr.pipe(process.stderr);
 });
});

gulp.task('default', [
 'typescript',
 'stylus',
 'develop',
 'watch'
]);
