const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const prefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

function style() {
    return gulp.src('./styles/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./styles/'))
        .pipe(browserSync.stream());
}

function minifyCSS(){
    return gulp.src('./styles/*.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
}

function watch() {

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('./scss/**/*.scss', style); // if anything changes here it starts the 'style'.
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
    gulp.watch('./styles/*.css', minifyCSS)

}


exports.style = style;
exports.minifyCSS = minifyCSS;
exports.watch = watch;