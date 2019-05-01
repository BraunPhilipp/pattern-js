/* ----- plugins ----- */

var gulp        = require('gulp');
var browserify  = require('browserify');
var clean       = require('gulp-clean');
var merge       = require('merge-stream');
var taskListing = require('gulp-task-listing');
var jshint      = require('gulp-jshint');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var uglifycss   = require('gulp-uglifycss');
var rename      = require('gulp-rename');
var webserver   = require('gulp-webserver');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var gulpif      = require('gulp-if');
var del         = require('del');
var runSequence = require('run-sequence');
var processes   = require('child_process');


/* ----- dist tasks ----- */

var exec = require('child_process').exec;
var isDebug;

// Handle errors
function errorHandler (error) {
  console.log(error);
  this.emit('end');
}

gulp.task('x-message', function() {
  return console.log('Gulp is running ...')
});

// dev webserver
gulp.task('x-webserver', function() {
  gulp.src('dist/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

// watch files for changes
gulp.task('x-watch', function() {
  gulp.watch('js/*.js', ['lint', 'x-browserify']);
  gulp.watch('scss/*.scss', ['x-sass']);
  gulp.watch(['src/images/**/*',
              'js/*',
              'html/*'
             ], ['x-copy']);
});

// compile JS
gulp.task('x-browserify', function() {
  return browserify({
      entries: 'js/pattern.js'
    })
    .bundle()
    .on("error", errorHandler)
    .pipe(source('pattern.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/js'));
});

// compile SASS
gulp.task('x-sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

// copy supporting files
gulp.task('x-copy', function() {

  var images = gulp.src(['images/**/*'])
    .pipe(gulp.dest('dist/images'));


  // var css = gulp.src(['src/css/lib/*.css'])
  //   .pipe(gulp.dest('dist/css'));
  //
  // var webfonts = gulp.src(['src/css/webfonts/*'])
  //   .pipe(gulp.dest('dist/css/webfonts'));
  //
  // var js = gulp.src(['js/lib/*.js'])
  //   .pipe(gulp.dest('dist/js/lib'));

  var html = gulp.src(['html/*'])
    .pipe(gulp.dest('dist'));

  return merge(images, html);
});

// minify assets
gulp.task('x-minify', function() {
  return gulp.src('dist/css/*.css')
    .pipe(uglifycss({
      "max-line-len": 80
    }))
    .pipe(gulp.dest('dist'));
});


/* ----- user tasks ----- */

// cleanup the dist directory
gulp.task('clean', function() {
  return del(['./dist/*']);
});

// lint javascript
gulp.task('lint', function() {
  return gulp.src(['js/*.js', 'js/*.js'], {base: 'src/js/'})
    .pipe(jshint())
    .on('error', errorHandler)
    .pipe(jshint.reporter('default'));
});

// // dist production assets
// gulp.task('prod', function(done) {
//   isDebug = false;
//   return runSequence('clean',
//                      'x-sass',
//                      'x-browserify',
//                      'x-minify',
//                      'x-copy',
//                      done);
// });

// start dev server
gulp.task('dev', [], function(done) {
  isDebug = true;
  return runSequence('clean',
                     ['x-sass', 'x-browserify'],
                     'x-copy',
                     ['lint', 'x-webserver', 'x-watch'],
                     done);
});

// default: list tasks
gulp.task('default', taskListing.withFilters(null, 'x-'));
