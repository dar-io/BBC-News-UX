// gulpfile.js
//

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var spawn       = require('child_process').spawn;
var ghPages     = require('gulp-gh-pages');


// PATHS
//

var source      = './source_files';
var destination = './distribute';


// JEKYLL
//

gulp.task('jekyll-build', function( done ) {
  return spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('jekyll-reload', ['jekyll-build'], function() {
  browserSync.reload();
});


// BROWSER SYNC
//

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {

  browserSync({
    ui:        false,
    server:    { baseDir: destination },
    ghostMode: false,
    online:    false,
    notify:    false
  });

});


// SASS
//

gulp.task('sass', function() {

  return gulp
    .src( source + '/sass/main.scss' )
    .pipe(
      sass({ outputStyle: 'compressed' })
        .on('error', sass.logError)
    )
    .pipe( prefix() )
    .pipe( gulp.dest( destination + '/css' ) )
    .pipe( browserSync.reload({ stream: true }) )
    .pipe( gulp.dest( source + '/css' ) );

});

// WATCH
//

gulp.task('watch', function() {

  gulp.watch( source + '/sass/*.scss', ['sass'] );
  gulp.watch([
    source + '/*.html',
    source + '/_data/*.yml',
    source + '/_includes/**/*.html',
    source + '/_layouts/*.html',
    source + '/img/**/*',
    source + '/js/main.js'
  ], ['jekyll-reload']);

});

// DEPLOY
//

gulp.task('deploy', function() {

  return gulp
    .src( destination + '/**/*')
    .pipe( ghPages() );

});


// DEFAULT
// - `gulp`

gulp.task('default', ['browser-sync', 'watch']);
