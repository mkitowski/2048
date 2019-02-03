var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var Files = {
    html: './index.html',
    css_dest: './css',
    scss_all: './scss/**/*.scss',
    scss_main: './scss/*.scss',
};

gulp.task('sass', function () {

    return gulp.src(Files.scss_main)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', errLogToConsole: true
        }))
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(Files.css_dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', gulp.series('sass', function() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(Files.scss_all, gulp.series(gulp.parallel('sass')));
    gulp.watch(Files.html).on('change', browserSync.reload);
}));
gulp.task('start', gulp.parallel('sass', 'watch'));