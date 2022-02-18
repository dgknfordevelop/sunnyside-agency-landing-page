const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const prefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');


function style() {
    return gulp.src('./styles/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./src/'))
        .pipe(browserSync.stream());
}

function minifyHTML(){
    return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
}

function minifyCSS(){
    return gulp.src('./src/*.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
  .pipe(gulp.dest('dist'))
}


function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    
    gulp.watch('./styles/scss/**/*.scss', style); // if anything changes here it starts the 'style'.
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/*.js').on('change', browserSync.reload);
    gulp.watch('./src/*.html', minifyHTML);
    gulp.watch('./src/*.css', minifyCSS);
}

function defaultTask(){
    style();
    minifyHTML();
    minifyCSS();
    watch();
}

exports.default = defaultTask;